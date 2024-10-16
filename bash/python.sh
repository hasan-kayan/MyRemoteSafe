#!/bin/bash

# Python kontrolü
if command -v python3 &>/dev/null; then
    echo "Python 3 is already installed."
else
    echo "Python 3 is not installed. Installing Python 3..."
    sudo apt update
    sudo apt install -y python3
fi

# Pip kontrolü
if command -v pip3 &>/dev/null; then
    echo "pip is already installed."
else
    echo "pip is not installed. Installing pip..."
    sudo apt install -y python3-pip
fi

# venv kontrolü
if python3 -m venv --help &>/dev/null; then
    echo "venv is already installed."
else
    echo "venv is not installed. Installing python3-venv..."
    sudo apt install -y python3-venv
fi

echo "All required packages are installed."
