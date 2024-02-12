pipeline {
    agent any
    triggers {
        pollSCM '* * * * *'
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Vicky-Panchal/calculatorOps.git'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build('calculator', '.').push()
                }
            }
        }
        
        stage('Push Docker Images') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'DockerHubCred', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        docker.withRegistry('https://index.docker.io/v1/', 'docker-registry-credentials') {
                            docker.image('calculator').push("${env.BUILD_NUMBER}")
                            docker.image('calculator').push('latest')
                        }
                    }
                }
            }
        }
        
        stage('Run Ansible PLaybook') {
                    steps {
                        ansiblePlaybook becomeUser: 'null',
                        extras: "-e tag=$BUILD_NUMBER -e user=$USER -e image=$IMAGE",
                        colorized: true,
                        installation: 'Ansible',
                        inventory: 'inventory',
                        playbook: 'deploy-playbook.yml',
                        sudoUser: 'null'
                    }
                }
    }
    
    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
