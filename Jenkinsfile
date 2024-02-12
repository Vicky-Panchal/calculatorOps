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
                sh '''
                docker build -t vickypanchal:spe .
                '''
            }
        }
        
        stage('Push Docker Images') {
            steps {
                sh '''
                docker push vickypanchal:spe
                '''
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
