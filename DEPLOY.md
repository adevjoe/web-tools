# Deployment Guide

This guide explains how to deploy the Web Tools application on a Linux server using Docker and Docker Compose.

## Prerequisites

- **Docker**: Ensure Docker is installed and running.
- **Docker Compose**: Ensure Docker Compose is installed.

## Deployment Steps

1.  **Clone the Repository** (or copy the files to your server):
    ```bash
    git clone <repository-url>
    cd web-tool
    ```

2.  **Build and Run**:
    Run the following command to build the Docker image and start the container in detached mode:
    ```bash
    docker-compose up -d --build
    ```

3.  **Verify Deployment**:
    Open your browser and navigate to `http://localhost:8080` (or your server's IP address at port 8080).

## Management Commands

- **Stop the application**:
    ```bash
    docker-compose down
    ```

- **View logs**:
    ```bash
    docker-compose logs -f
    ```

- **Rebuild after changes**:
    ```bash
    docker-compose up -d --build
    ```

## Configuration

- **Port**: By default, the application runs on port `8080`. To change this, edit the `ports` section in `docker-compose.yml`:
    ```yaml
    ports:
      - "YOUR_PORT:80"
    ```
