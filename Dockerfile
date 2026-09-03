FROM alpine:latest

# Install bash and create the restricted bash shortcut
RUN apk add --no-cache bash && ln -s /bin/bash /bin/rbash

# Create a user named "ptyuser", set their home to /workspace, and shell to rbash
RUN adduser -D -h /workspace -s /bin/rbash ptyuser

# Ensure the user owns the workspace
RUN chown -R ptyuser:ptyuser /workspace

# Switch to that user
USER ptyuser
WORKDIR /workspace

CMD ["sleep", "3600"]