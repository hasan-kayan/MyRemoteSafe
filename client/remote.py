import socket

# Define the server's IP address and port
server_ip = '0.0.0.0'  # Use '0.0.0.0' to listen on all available network interfaces
server_port = 12345

# Create a socket object
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Bind the socket to the server's address and port
server_socket.bind((server_ip, server_port))

# Listen for incoming connections (1 connection at a time)
server_socket.listen(1)
print(f"Server is listening on {server_ip}:{server_port}")

# Accept a connection from a client
client_socket, client_address = server_socket.accept()
print(f"Accepted connection from {client_address}")

# Receive data from the client
data = client_socket.recv(1024)
print(f"Received data from the client: {data.decode('utf-8')}")

# Close the sockets
client_socket.close()
server_socket.close()
