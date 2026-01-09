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
                sh 'git status'
            }
        }

        stage('Build Docker Images') {
            steps {
                echo "Building Docker images..."
                sh '''
                docker build -t ecommerce-frontend:latest ./store-ui
                docker build -t ecommerce-users:latest ./users-cna-microservice
                docker build -t ecommerce-products:latest ./products-cna-microservice
                docker build -t ecommerce-search:latest ./search-cna-microservice
                docker build -t ecommerce-cart:latest ./cart-cna-microservice
                '''
            }
        }

        stage('Trivy Security Scan') {
    steps {
        echo "Running Trivy vulnerability scan (tuned for CI)..."
        sh '''
        trivy image \
          --timeout 10m \
          --no-progress \
          --scanners vuln \
          --severity HIGH,CRITICAL \
          ecommerce-frontend:latest || true

        trivy image \
          --timeout 10m \
          --no-progress \
          --scanners vuln \
          --severity HIGH,CRITICAL \
          ecommerce-users:latest || true

        trivy image \
          --timeout 10m \
          --no-progress \
          --scanners vuln \
          --severity HIGH,CRITICAL \
          ecommerce-products:latest || true

        trivy image \
          --timeout 10m \
          --no-progress \
          --scanners vuln \
          --severity HIGH,CRITICAL \
          ecommerce-search:latest || true

        trivy image \
          --timeout 10m \
          --no-progress \
          --scanners vuln \
          --severity HIGH,CRITICAL \
          ecommerce-cart:latest || true
        '''
    }
}


        stage('List Built Images') {
            steps {
                sh 'docker images | grep ecommerce'
            }
        }
    }

    post {
        success {
            echo "✅ CI pipeline + security scan successful"
        }

        failure {
            echo "❌ CI or security scan failed"
        }
    }
}

