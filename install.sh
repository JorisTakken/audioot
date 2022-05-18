#! /bin/bash

echo "**************************************************************"
echo "This scripts installs some utilities on your system"
echo
echo "NB: this is only for Mac OSX and Linux"
echo
echo "Type ENTER to continue or ^C to quit"
echo "**************************************************************"

read dummy

#
# Marc Groenewegen, September 6 2017
#

echo "Creating resource files for BASH and Racket in home directory"
cp bashrc ${HOME}/.bashrc
cp bash_profile ${HOME}/.bash_profile

