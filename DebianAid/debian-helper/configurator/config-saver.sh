function prompt_for_config() {
    CONFIG_FILE="$CONFIG_DIR/config.json"
    
    echo "Please enter your configuration in JSON format:"
    read -r USER_CONFIG

    # Validate JSON format
    if echo "$USER_CONFIG" | jq empty; then
        echo "$USER_CONFIG" > "$CONFIG_FILE"
        echo "Configuration saved to $CONFIG_FILE"
    else
        echo "Invalid JSON format. Please try again."
        prompt_for_config  # Re-prompt
    fi
}


#  sudo apt-get install jq
#  sudo apt-get install curl