# Variables
BACKEND_DIR=StoreHUB-auth
FRONTEND_DIR=StoreHUB-fronted

# Targets
.PHONY: all backend frontend

all: backend frontend

backend:
	@echo "Starting backend using Docker..."
	cd $(BACKEND_DIR) && docker-compose up --build

frontend:
	@echo "Starting frontend using npm..."
	cd $(FRONTEND_DIR) && npm run dev
