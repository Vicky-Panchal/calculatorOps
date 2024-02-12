pipeline {
    agent { 
        node {
            label 'docker-agent-node'
        }
    }
    triggers {
        pollSCM '* * * * *'
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'git@github.com:Vicky-Panchal/calculatorOps.git'
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
        
        stage('Run Ansible Playbook') {
            steps {
                script {
                    ansiblePlaybook(
                        playbook: 'deploy.yml',
                        inventory: 'inventory',
                        extras: "-e docker_image_tag=${env.BUILD_NUMBER}"
                    )
                }
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
