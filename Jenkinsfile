pipeline {
    agent any
    
    environment {
        ZALO_APP_MOBILE_IMAGE_NAME = 'phunguyenst/zalo-mobile'
        IMAGE_TAG = 'v1.0'
    }
    stages {
        stage('Prepare Environment') {
            steps {
                withCredentials([file(credentialsId: 'envmobile', variable: 'ENV_FILE')]) {
                    sh 'cp $ENV_FILE .env'
                }
            }
        }
        stage('Build') {
            steps {
                withDockerRegistry(credentialsId: 'dockerhub', url: 'https://index.docker.io/v1/') {
                    sh 'docker build -t $ZALO_APP_MOBILE_IMAGE_NAME:$IMAGE_TAG .'
                    sh 'docker push $ZALO_APP_MOBILE_IMAGE_NAME:$IMAGE_TAG'
                }
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker rm -f $(docker ps -a | grep -v "my-jenkins" | cut -d " " -f1) || true'
                sh 'docker compose up -d'
                sh 'docker rmi $(docker images -f "dangling=true" -q) || true'
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}