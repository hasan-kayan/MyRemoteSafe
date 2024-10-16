#!/bin/bash

# Git Configuration
echo "Configuring Git..."
git config --global user.name "Your Name"  # Replace with your actual name
git config --global user.email "your_email@example.com"  # Replace with your actual email

# Python Installation Check 
if command -v python3 &>/dev/null; then
    echo "Python 3 is already installed."
else
    echo "Python 3 is not installed. Installing Python 3..."
    apt install -y python3
fi

# Pip Installation Check
if command -v pip3 &>/dev/null; then
    echo "pip is already installed."
else
    echo "pip is not installed. Installing pip..."
    apt install -y python3-pip
fi

# venv check
if python3 -m venv --help &>/dev/null; then
    echo "venv is already installed."
else
    echo "venv is not installed. Installing python3-venv..."
    apt install -y python3-venv
fi

echo "All required packages are installed."

# Node.js Installation Check
if command -v node &>/dev/null; then
    echo "Node.js is already installed."
else
    echo "Node.js is not installed. Installing Node.js..."
    curl -sL https://deb.nodesource.com/setup_14.x | bash -
    apt install -y nodejs
fi

# NPM Installation Check
if command -v npm &>/dev/null; then
    echo "npm is already installed."
else
    echo "npm is not installed. Installing npm..."
    apt install -y npm
fi

# Yarn Installation Check
if command -v yarn &>/dev/null; then
    echo "yarn is already installed."
else
    echo "yarn is not installed. Installing yarn..."
    npm install -g yarn
fi

echo "All required packages are installed."

# Docker Installation Check
if command -v docker &>/dev/null; then
    echo "Docker is already installed."
else
    echo "Docker is not installed. Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    usermod -aG docker "$USER"
    rm get-docker.sh
fi

# Docker Compose Installation Check
if command -v docker-compose &>/dev/null; then
    echo "Docker Compose is already installed."
else
    echo "Docker Compose is not installed. Installing Docker Compose..."
    apt install -y docker-compose
fi

echo "System configuration completed!"
