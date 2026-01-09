pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo "Checking out source code..."
                // Jenkins already checks out code when using Pipeline from SCM
                sh 'git status'
            }
        }

        stage('Build Docker Images') {
            steps {
                echo "Building Docker images for all microservices..."
                sh '''
                docker build -t ecommerce-frontend:latest ./store-ui
                docker build -t ecommerce-users:latest ./users-cna-microservice
                docker build -t ecommerce-products:latest ./products-cna-microservice
                docker build -t ecommerce-search:latest ./search-cna-microservice
                docker build -t ecommerce-cart:latest ./cart-cna-microservice
                '''
            }
        }

        stage('List Built Images') {
            steps {
                echo "Verifying Docker images..."
                sh '''
                docker images | grep ecommerce
                '''
            }
        }
    }

    post {
        success {
            echo "✅ CI pipeline completed successfully (Docker build only)"
        }

        failure {
            echo "❌ CI pipeline failed"
        }

        always {
            echo "🧹 Pipeline finished"
        }
    }
}

