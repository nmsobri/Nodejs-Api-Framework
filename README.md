# Node-Dev-Container
Repo for VSCode Remote Container to work with Nodejs project

## Instruction
- Clone the repo `git clone git@github.com:slier81/Node-Dev-Container.git Node`
- Go inside the created folder `cd Node`
- Change folder owner `sudo chown :9999 -R .`  
- Change folder permission `sudo chmod 775 -R .`  
- Change folder sticky bit `sudo chmod g+s -R .`  
- Create **.env** file `mv .devcontainer/docker/.env.example .devcontainer/docker/.env`  
- Open main folder with VsCode `code .`
