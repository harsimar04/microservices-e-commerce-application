pipeline {
    agent any

    environment {
        KUBECONFIG = "/var/lib/jenkins/.kube/config"
    }

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    stages {

        stage('Docker Build - Microservices') {
            steps {
                echo "Building Docker images..."
                sh '''
                docker build -t ecommerce-frontend ./store-ui
                docker build -t ecommerce-users ./users-cna-microservice
                docker build -t ecommerce-products ./products-cna-microservice
                docker build -t ecommerce-search ./search-cna-microservice
                docker build -t ecommerce-cart ./cart-cna-microservice
                '''
            }
        }

        stage('Verify Kubernetes Access') {
            steps {
                echo "Checking Kubernetes access..."
                sh '''
                kubectl get nodes
                kubectl get pods -n ecommerce
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo "Deploying to Kubernetes..."
                sh '''
                kubectl apply -f infra/k8s/
                '''
            }
        }
    }

    post {
        success {
            echo "✅ CI/CD Pipeline completed successfully"
        }
        failure {
            echo "❌ CI/CD Pipeline failed"
        }
    }
}

