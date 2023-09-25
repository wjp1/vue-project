let myPlugin = {

}

myPlugin.install = function(Vue,option){
    console.log(Vue);
    console.log(option);
    console.log('调用');
}

export default myPlugin