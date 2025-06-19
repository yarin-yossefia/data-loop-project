pipeline {
    agent any

    environment {
        TF_IN_AUTOMATION = "true"
        TF_INPUT = "false"
    }

    stages {
//        stage('Checkout') {
//            steps {
//                // מבצע clone לקוד מה-repository כדי שקבצים כמו Terraform, סקריפטים, YAML וכו' יהיו זמינים לשלבים הבאים
//                checkout scm
//            }
//        }

        stage('Terraform Init & Plan') {
            steps {
                withCredentials([file(credentialsId: 'gcp-terraform-service-account', variable: 'GOOGLE_CREDS_FILE')]) {
                    // נותן ל-Terraform את קובץ ה-service account כמשתנה סביבה
                    withEnv(["GOOGLE_APPLICATION_CREDENTIALS=${GOOGLE_CREDS_FILE}"]) {
                        dir('infra/terraform') {
                            sh 'terraform init -input=false'
                            sh 'terraform validate'
                            sh 'terraform plan -out=tfplan'
                        }
                    }
                }
            }
        }

        stage('Approval') {
            steps {
                script {
                    def userInput = input(
                        id: 'ConfirmApply', message: 'להריץ Terraform apply?',
                        parameters: [
                            choice(name: 'Action', choices: ['Yes', 'No'], description: 'לבחור האם להחיל את השינויים')
                        ]
                    )
                    if (userInput != 'Yes') {
                        error("המשתמש בחר לא להמשיך ל-apply ❌")
                    }
                }
            }
        }

        stage('Terraform Apply') {
            steps {
                withCredentials([file(credentialsId: 'gcp-terraform-service-account', variable: 'GOOGLE_CREDS_FILE')]) {
                    withEnv(["GOOGLE_APPLICATION_CREDENTIALS=${GOOGLE_CREDS_FILE}"]) {
                        dir('infra/terraform') {
                            sh 'terraform apply -auto-approve tfplan'
                        }
                    }
                }
            }
        }
    }
}
