FROM ubuntu:22.04

# Setup workdir
WORKDIR /workspace

# Copy local code to the container image.
COPY run.sh .

# Ensure the script is executable
RUN chmod +x ./run.sh

# Run the script
ENTRYPOINT ["./run.sh"]
