//var ObsClient = require('./lib/obs');
import { ObsClient } from "js\huaweicloud-sdk-browserjs-obs-master\dist\esdk-obs-browserjs-without-polyfill.3.22.3.min.js";

    // Cria um objeto do serviço S3
    var Obs = new ObsClient({
        region: 'cn-north-4',
        access_key_id: '2GEROOPBTDSPZZFQ9TMS',
        secret_access_Key: '1kkpTBsoxbKzAbJdEvdCe6Ygbn79e1vgGz5W5pSb',
        server: 'qrcode.dispensar.obs.sa-brazil-1.myhuaweicloud.com'
    });

    Obs.putObject({
        Bucket: 'qrcode.dispensar',
        Key: getRandonHash().toString(),
        Body: formDataJson
    },function(err,result){
        if(err){
            console.error('Error-->' + err);
        }else{
            console.log('Status-->' + result.CommonMsg.status);
        }
    })