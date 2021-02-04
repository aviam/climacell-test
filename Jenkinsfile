pipeline {
    environment {
     dockerRegistry = "https://gcr.io"
     repoName = "inbound-lattice-237414/devops-challeng"
     dockerRegistryCredential = 'gcr:inbound-lattice-237414'
     dockerImage = ''
   }
  agent any 
  stages {
    stage('Checkout') {
           steps{           
                  dir('deploy') {
                          checkout scm  
                    }
                    dir('app'){
                          git url: 'https://github.com/climacell/devops-challenge.git'
                    }
           }
       }  
    stage('Build And Push docker Image Step') {
      steps {
        container('docker') {
           script {
            dockerImage = docker.build repoName + ":$BUILD_NUMBER"
           }
           script {
              docker.withRegistry( dockerRegistry, dockerRegistryCredential ) {
              dockerImage.push()
           }
          }
     }
   }
  }
  stage('Deployment') {
            steps {
                script {
                  container('helm') {
                      // Init authentication and config for your kubernetes cluster
                      sh("helm init --client-only --skip-refresh")
                      sh ("helm get devops-challenge")
                      sh("helm upgrade --install devops-challenge --wait ./helm-chart --namespace stage --set image.tag=$BUILD_NUMBER")
                    }
                }
            }
        }
   }
}
