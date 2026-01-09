pipeline {
    agent any

    environment {
        KUBECONFIG = "/var/lib/jenkins/.kube/config"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/harsimar04/microservices-e-commerce-application.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh '''
                docker build -t ecommerce-frontend ./store-ui
                docker build -t ecommerce-users ./users-cna-microservice
                docker build -t ecommerce-products ./products-cna-microservice
                docker build -t ecommerce-search ./search-cna-microservice
                docker build -t ecommerce-cart ./cart-cna-microservice
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                kubectl apply -f infra/k8s/
                '''
            }
        }
    }
}

