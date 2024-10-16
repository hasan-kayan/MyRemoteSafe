#!/bin/bash

CONFIG_DIR="$HOME/.deb-developer/config"

# Create the configuration directory if it doesn't exist
if [ ! -d "$CONFIG_DIR" ]; then
    mkdir -p "$CONFIG_DIR"
    echo "Configuration directory created at $CONFIG_DIR"
fi
