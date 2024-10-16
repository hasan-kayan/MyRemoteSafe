#!/bin/bash

# Check if script is running as root
if [ "$(id -u)" -ne 0 ]; then
    echo "This script must be run as root. Use sudo."
    exit 1
fi

# Function to check and configure swap
configure_swap() {
    echo "Checking for existing swap..."
    if free | grep -i swap > /dev/null; then
        echo "Swap is already configured."
        # Display current swap size
        free -h | grep -i swap
    else
        echo "No swap found, creating swapfile..."
        fallocate -l 4G /swapfile  # Create 4GB swapfile (Adjust size if needed)
        chmod 600 /swapfile
        mkswap /swapfile
        swapon /swapfile
        echo "/swapfile none swap sw 0 0" | tee -a /etc/fstab
        echo "Swapfile created and enabled."
    fi
}

# Function to update GRUB bootloader
update_grub() {
    echo "Updating GRUB bootloader..."
    grub-install /dev/sda  # Replace with correct boot device (e.g., /dev/nvme0n1 for NVMe drives)
    update-grub
    echo "GRUB has been updated."
}

# Function to install NVIDIA drivers (for NVIDIA GPUs)
install_nvidia_drivers() {
    echo "Checking for NVIDIA GPU..."
    if lspci | grep -i nvidia > /dev/null; then
        echo "NVIDIA GPU found, installing drivers..."
        ubuntu-drivers autoinstall
        echo "NVIDIA drivers installed."
    else
        echo "No NVIDIA GPU found, skipping driver installation."
    fi
}

# Function to check file system integrity
check_filesystem() {
    echo "Checking file system integrity..."
    echo "Checking root (/) partition..."
    fsck /dev/sda1 -y  # Replace with your root partition
    echo "Checking home (/home) partition (if exists)..."
    if lsblk | grep -q "/home"; then
        fsck /dev/sda2 -y  # Replace with your home partition
    else
        echo "No separate /home partition found."
    fi
    echo "File system check completed."
}

# Function to enable hibernation (if swap is larger than RAM)
enable_hibernation() {
    echo "Enabling hibernation..."
    RAM_SIZE=$(grep MemTotal /proc/meminfo | awk '{print $2}')
    SWAP_SIZE=$(grep SwapTotal /proc/meminfo | awk '{print $2}')
    
    if [ "$SWAP_SIZE" -ge "$RAM_SIZE" ]; then
        echo "Swap size is sufficient for hibernation."
        sed -i 's/#HibernateMode=platform/hibernateMode=platform/' /etc/systemd/sleep.conf
        echo "Hibernation enabled."
    else
        echo "Swap size is insufficient for hibernation. Please increase swap size."
    fi
}

# Function to configure UEFI or BIOS
check_uefi_mode() {
    if [ -d /sys/firmware/efi ]; then
        echo "System is booted in UEFI mode."
    else
        echo "System is booted in BIOS (Legacy) mode."
    fi
}

# Function to install additional software
install_software() {
    echo "Installing common tools and software..."
    apt update
    apt install -y build-essential curl git gparted net-tools
    echo "Common tools installed."
}

# Main script execution
echo "Starting system configuration..."

# Run functions
configure_swap
update_grub
install_nvidia_drivers
check_filesystem
enable_hibernation
check_uefi_mode
install_software

# Basic Updates
echo "Updating the package list and upgrading installed packages..."
apt update
apt upgrade -y

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
