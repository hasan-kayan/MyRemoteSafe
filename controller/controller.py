import socket

# Define the server's IP address and port
server_ip = 'server_ip_here'  # Replace with the server's IP address
server_port = 12345

# Create a socket object
client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Connect to the server
client_socket.connect((server_ip, server_port))
print(f"Connected to the server at {server_ip}:{server_port}")

# Send data to the server
message = "Hello, server!"
client_socket.send(message.encode('utf-8'))
print(f"Sent data to the server: {message}")

# Close the socket
client_socket.close()
