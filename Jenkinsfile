pipeline {
    agent any

    environment {
        TF_IN_AUTOMATION = "true"
        TF_INPUT = "false"
    }

    stages {
//        stage('Checkout') {
//            steps {
//                checkout scm
//            }
//        }

        stage('Terraform Init & Plan') {
            steps {
                withCredentials([file(credentialsId: 'gcp-terraform-service-account', variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
                    withEnv(["GOOGLE_APPLICATION_CREDENTIALS=${GOOGLE_CREDS_FILE}"]) {
                        dir('tenants/company-a/staging') {
                            sh 'terraform init -input=false'
                            sh 'terraform validate'
                            sh 'terraform plan -out=tfplan'
                        }
                    }
                }
            }
        }

//        stage('Approval') {
//            steps {
//                script {
//                    def userInput = input(
//                        id: 'ConfirmApply', message: 'להריץ Terraform apply?',
//                        parameters: [
//                            choice(name: 'Action', choices: ['Yes', 'No'], description: 'לבחור האם להחיל את השינויים')
//                        ]
//                    )
//                    if (userInput != 'Yes') {
//                        error("המשתמש בחר לא להמשיך ל-apply ❌")
//                    }
//                }
//            }
//        }

        stage('Terraform Apply') {
            steps {
                withCredentials([file(credentialsId: 'gcp-terraform-service-account', variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
//                    withEnv(["GOOGLE_APPLICATION_CREDENTIALS=${GOOGLE_CREDS_FILE}"]) {
                        dir('tenants/company-a/staging') {
                            sh 'terraform apply -auto-approve tfplan'
                        }
                    }
                }
            }
        }
    }
}
