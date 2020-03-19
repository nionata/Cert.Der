#!/bin/sh

if [ ! $(which mkcert) ]
    then
    if [ $(which brew)]
        then
        echo "Need to install homebrew"
        exit 1
    else
        brew install mkcert
        mkcert -install
    fi
fi

mkdir -p certs
cd certs
mkcert example.com "*.example.com" example.test localhost 127.0.0.1 ::1
cd ..
