#include <string>
#include <iostream>
#include <math.h>
#include <thread>
#include <unistd.h> // sleep
#include "jack_module.h"
#include "keypress.h"
#include "bufferDebugger.h"
#include "osc.h"

#include <opencv2/core.hpp>
#include <opencv2/imgproc.hpp>
#include <opencv2/highgui.hpp>
#include <opencv2/opencv.hpp>
using namespace cv;
using namespace std;

float bright = 0;float dark = 0;
int NumberOfLines;
int Red = 0; int Green = 0; int Blue = 0;
int pixelAmount;

void numberOfLines(Mat img){
    // amount of lines in picture
    vector<vector<Point> > contours;
    vector<Vec4i> hierarchy;
    Mat lineDet;
    Canny(img, lineDet, 50, 200, 3);
    findContours(lineDet, contours, hierarchy, RETR_TREE, CHAIN_APPROX_SIMPLE, Point(0, 0));
    NumberOfLines = contours.size();
    cout << "NumberOfLines " << NumberOfLines << endl;

    // imshow("original Image", img);
    // imshow("canny", lineDet);
}
    
void Brightness(Mat img){
    // get brightness and darkness in painting
    Mat blackWhite;
    cvtColor(img, blackWhite, COLOR_BGR2GRAY);
    for(int y=0;y<blackWhite.rows;y++){
        for(int x=0;x<blackWhite.cols;x++){
            Vec3b & color = blackWhite.at<Vec3b>(y,x);
            if(color[0] > 128 && color[1] > 128 && color[2] > 128){
                // add value of brightness if the pixle is more bright
                bright += 1;
            } else {
                dark += 1;
            }
        }  
    }    
    // imshow("blurr", blackWhite);
    pixelAmount = blackWhite.rows * blackWhite.cols;
    bright /= (pixelAmount/100);
    dark /= (pixelAmount/100);

    cout << "bright " <<  bright << endl;
    cout << "dark " << dark << endl;
}

void color(Mat img){
    // get avarage RGB values
    int R,G,B;
    Mat blur_img;
    blur(img, blur_img, Size(250 , 250));    
    for(int y=0;y<blur_img.rows;y++){
        for(int x=0;x<blur_img.cols;x++){
            Vec3b & color = blur_img.at<Vec3b>(y,x);
            R = color[0];
            Red += R;

            G = color[1];
            Green += G;

            B = color[2];
            Blue += B;
        }  
    }    

    Red /= pixelAmount;
    Green /= pixelAmount;
    Blue /= pixelAmount;

    cout << pixelAmount <<  " Pixels" << endl;
    cout << Red << "  R" << endl;
    cout << Green << "  G" << endl;
    cout << Blue << "  B" << endl;
}

void sendOSCData(lo_address target){
    // send all OSC messages to max
    lo_send(target,"/numberOfLines","i",NumberOfLines);

    lo_send(target,"/bright","f",bright);
    lo_send(target,"/dark","f",dark);

    lo_send(target,"/red","i",Red);
    lo_send(target,"/blue","i",Blue);
    lo_send(target,"/green","i",Green);
}

void preformFunctions(Mat img){
    // function to do all the analyeses at ones
    numberOfLines(img);
    Brightness(img);
    color(img);

}

int main() {
    lo_address target;
    target = lo_address_new("localhost","7777");
    int position=10;
    Mat img;
    bool run = true;

        cout << "----------------------------------" << endl;
        cout << "Choose the painting you want to hear a sonification of!" << endl;
        cout << "(1) Thérèse van de Berg - Poses all-in" << endl;
        cout << "(2) antonio's painting - oranges" << endl;
        cout << "(3) agda Zimmermans - leaves" << endl;
        cout << "----------------------------------" << endl;

    while (run){
        switch (std::cin.get()){

        case 'q':
            run = false;
            break;    

        case '1':
            img = imread("/Users/joristakken/Documents/CSD2/CSD2d/paintingSonifications/fotos/IMG1.png");
            cout << "----------------------------------" << endl;
            cout << "Thérèse van de Berg - Poses all-in" << endl;
            cout << "----------------------------------" << endl;


            preformFunctions(img);
            sendOSCData(target);

            imshow("painting",img);   
            waitKey(10);
            break;

        
        case '2':
            img = imread("/Users/joristakken/Documents/CSD2/CSD2d/paintingSonifications/fotos/IMG2.png");
            cout << "----------------------------" << endl;
            cout << "antonio's painting - oranges" << endl;
            cout << "----------------------------" << endl;


            preformFunctions(img);
            sendOSCData(target);

            imshow("painting",img);   
            waitKey(10);
            break;

        case '3':
            img = imread("/Users/joristakken/Documents/CSD2/CSD2d/paintingSonifications/fotos/IMG3.png");
            cout << "----------------------------" << endl;
            cout << "Magda Zimmermans - leaves" << endl;
            cout << "----------------------------" << endl;

            preformFunctions(img);
            sendOSCData(target);

            imshow("painting",img);   
            waitKey(10);
            break;
        }
    }





    destroyAllWindows();
}

