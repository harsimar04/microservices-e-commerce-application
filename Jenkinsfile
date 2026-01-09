pipeline {
    agent any

    environment {
        // Jenkins kubeconfig (VERY IMPORTANT)
        KUBECONFIG = "/var/lib/jenkins/.kube/config"
    }

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo "Cloning GitHub repository..."
                git url: 'https://github.com/harsimar04/microservices-e-commerce-application.git'
            }
        }

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
                echo "Checking Kubernetes cluster access..."
                sh '''
                kubectl version --client
                kubectl get nodes
                kubectl get pods -n ecommerce
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo "Deploying manifests to Kubernetes..."
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

        always {
            echo "🧹 Pipeline finished"
        }
    }
}

