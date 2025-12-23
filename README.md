# Unity Assignment – Local Kubernetes Setup

This project runs a multi-service application on Kubernetes using Helm, with CI/CD handling image builds and Helm value updates.

---

## Prerequisites
Make sure you have the following installed locally:
- Docker
- Kubernetes cluster
- Docker Desktop (Kubernetes enabled) or
- Minikube / Kind
- kubectl
- Helm (v3+)

Verify installation:

```Bash
kubectl version --client
helm version
```

## Project Structure
```YAML
.
├── frontend/
├── backend/
│   ├── customer-api/
│   └── web-server/
├── unity-assign/          
│   ├── Chart.yaml
│   ├── values.yaml
│   └── templates/
└── README.md
```

## Initial Deployment 

- Clone the repository to your local machine:

```Bash
git clone https://github.com/zivklein21/home-assignment-unity.git
cd home-assignment-unity
```

- Install nginx ingress controller - to make back and front ingress 

```Bash
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
helm install ingress-nginx ingress-nginx/ingress-nginx --namespace ingress-nginx --create-namespace
```

- Deploy the application to your local Kubernetes cluster using Helm:

```Bash
helm install unity ./unity-assign
```

This will create:
- Deployments
- Services
- Ingress
- Databases (Mongo, Kafka, etc.)

- Accessing the Application
    After installation, the web application is available at:

```Bash
http://localhost
```

> [!WARNING]
>  Make sure your Ingress controller is running


## CI/CD Flow 
When you push code to the master branch:
- GitHub Actions:
    	Detects which services changed
    	Builds Docker images in parallel
      	Pushes images to Docker Hub
    	Updates image tags in unity-assign/values.yaml
    	Commits the updated Helm values back to Git

## Applying CI/CD Changes Locally
- After CI/CD completes, pull the latest changes:

```Bash
git pull
```

- Then apply the updated Helm chart:
```Bash
helm upgrade --install unity ./unity-assign
```


This will:
- Pull the new Docker images
- Update only the services that changed
- Keep existing resources intact


## Cleanup (Optional)
To remove everything from your cluster:

```Bash
helm uninstall unity
```

