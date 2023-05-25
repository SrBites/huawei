//ROTA DA PRESCRIÇÃO
exports.presc = ("/presc", (req, res) => {
  console.log("miguel inventa");
  try {
    const mysql = require("mysql2");

    const connection = mysql.createConnection({
      host: "localhost", // IP do servidor MySQL
      port: "3306",
      user: "asesp", // nome de usuário do MySQL
      password: "123456", // senha do MySQL
      database: "bd_registrar", // nome do banco de dados que você deseja se conectar
    });

    connection.connect(function (err) {
      if (err) {
        console.error("Erro ao conectar ao banco de dados: " + err.stack);
        return res.status(500).send("Erro ao conectar ao banco de dados");
      }
      console.log("Conexão bem sucedida com o ID: " + connection.threadId);

      var insertSql = "INSERT INTO presc (hash_presc, data_emissao, data_vencimento, medication1, medication2, medication3) VALUES (?, ?, ?, ?, ?, ?)";
      var values = [req.body.hash_presc, req.body.data_emissao, req.body.data_vencimento, req.body.medication1, req.body.medication2, req.body.medication3];

      connection.query(insertSql, values, function (error, results, fields) {
        if (error) {
          console.error("Erro ao inserir dados: " + error.stack);
          return res.status(500).send("Erro ao inserir dados");
        }
        console.log("Dados inseridos com sucesso");

        const selectSql = "SELECT * FROM presc";

        connection.query(selectSql, function (error, results, fields) {
          if (error) {
            console.error("Erro ao selecionar dados: " + error.stack);
            return res.status(500).send("Erro ao selecionar dados");
          }
          console.log("Dados selecionados com sucesso");
          console.log(results);

          connection.end(function (err) {
            if (err) {
              console.error("Erro ao fechar a conexão: " + err.stack);
              return res.status(500).send("Erro ao fechar a conexão");
            }
            console.log("Conexão fechada com o ID: " + connection.threadId);
            return res.status(200).send("Dados inseridos e selecionados com sucesso");
          });
        });
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Erro interno no servidor");
  }
});

//ROTA DA DISPENSAÇÃO
exports.disp = ("/disp", (req, res) => {
  console.log("miguel inventa");
  try {
    const mysql = require("mysql2");

    const connection = mysql.createConnection({
      host: "localhost", // IP do servidor MySQL
      port: "3306",
      user: "asesp", // nome de usuário do MySQL
      password: "123456", // senha do MySQL
      database: "bd_registrar", // nome do banco de dados que você deseja se conectar
    });

    connection.connect(function (err) {
      if (err) {
        console.error("Erro ao conectar ao banco de dados: " + err.stack);
        return;
      }
      console.log("Conexão bem sucedida com o ID: " + connection.threadId);

      var insertSql = "UPDATE presc SET medication1 = GREATEST (medication1 - ?, 0), medication2 = GREATEST(medication2 - ?, 0),medication3 = GREATEST(medication3 - ?, 0) WHERE hash_presc = ?;"
      var values = [req.body.medication1_disp, req.body.medication2_disp, req.body.medication3_disp, req.body.hash_presc];

      connection.query(insertSql, values, function (error, results, fields) {
        if (error) {
          console.error("Erro ao inserir dados: " + error.stack);
          return res.status(500).send("Erro ao inserir dados");
        }
        console.log("Dados atualizados com sucesso");

        const selectSql = "SELECT * FROM presc";

        connection.query(selectSql, function (error, results, fields) {
          if (error) {
            console.error("Erro ao selecionar dados: " + error.stack);
            return res.status(500).send("Erro ao selecionar dados");
          }
          console.log("Dados selecionados com sucesso");
          console.log(results);

          connection.end(function (err) {
            if (err) {
              console.error("Erro ao fechar a conexão: " + err.stack);
              return res.status(500).send("Erro ao fechar a conexão");
            }
            console.log("Conexão fechada com o ID: " + connection.threadId);
            return res.status(200).send("Dados inseridos e selecionados com sucesso");
          });
        });
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("err", err).send();
  }
});

//ROTA PARA PEGAR DADOS DO BANCO
exports.getpresc = ("/getpresc", (req, res) => {
  console.log("miguel inventa");
  console.log(req.body)
  try {
    const mysql = require("mysql2");

    const connection = mysql.createConnection({
      host: "localhost", // IP do servidor MySQL
      port: "3306",
      user: "asesp", // nome de usuário do MySQL
      password: "123456", // senha do MySQL
      database: "bd_registrar", // nome do banco de dados que você deseja se conectar
    });

    connection.connect(function (err) {
      if (err) {
        console.error("Erro ao conectar ao banco de dados: " + err.stack);
        return res.status(500).send("Erro ao conectar ao banco de dados");
      }
      console.log("Conexão bem sucedida com o ID: " + connection.threadId);

      var insertSql = "SELECT medication1,medication2,medication3 FROM presc WHERE hash_presc = ?;"
      var values = [req.body.hash_presc];

      connection.query(insertSql, values, function (error, results, fields) {
        if (error) {
          console.error("Erro ao selecionar dados: " + error.stack);
          return res.status(500).send("Erro ao selecionar dados");
        }
        console.log("Dados selecionados com sucesso");
        console.log(results);

        connection.end(function (err) {
          if (err) {
            console.error("Erro ao fechar a conexão: " + err.stack);
            return res.status(500).send("Erro ao fechar a conexão");
          }
          console.log("Conexão fechada com o ID: " + connection.threadId);
          return res.status(200).send(results);
        });
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("err", err).send();
  }
});

//ROTA DO BITES
exports.bites = ("/bites", (req, res) => {

  var ObsClient = require("esdk-obs-nodejs");
  // Cria um objeto do serviço S3
  var Obs = new ObsClient({
    region: 'sa-brazil-1',
    access_key_id: '2GEROOPBTDSPZZFQ9TMS',
    secret_access_Key: '1kkpTBsoxbKzAbJdEvdCe6Ygbn79e1vgGz5W5pSb',
    server: 'https://qrcode.dispensar.obs.sa-brazil-1.myhuaweicloud.com:443/prescricoes/prescri%C3%A7%C3%A3o%20%281%29.json?AWSAccessKeyId=L8GYPZXGCNM0GTUS3ASD&Expires=1683229384&x-amz-security-token=gQpsYS1zb3V0aC0yiV08DRiIV5FjxilY10I7rVvF3AWiGlgzecTulAaTXMYN5JDkqHyThJXdCD7dS7SjyRNzdhhjrE5xmUMReQFPhmTZpUDPmDV8iwTJ9qxySWI0zlIkeHjZuZMnMZ37kDin01oxTv2dQ96vk7HPHiriYbE7DQY6D1-S_Ehmt3b9ynJke6GrFf09YngbQUqC23Vuvl966DEnU4Hp8hasJWknARwvNybIsPxThrHZijqdfhsurXdQSxSJZ4-SpXV9NWNVoi1EatMVT043ueVe163gjXdiozVo3yj_E8TGnOYjB_uHeM9Q9cXP82fR87GI9TUncUfP5BJBdrbuj2fxC7T6RNYdl9nEikFlHS5vrdEzT-CHC5Gk6espbdjZFpUmVu8X-o6FYvWS4GTLgXvGMNDDdld-DSP-41_Gm1SIEGbBTCj7GL1wl043VcYa7c-8OaDeqm_9LX3jniYRKz8Ue3Ff_HkrKbqLX-0tGAr3jWFLsSU-yx-0JoG9PxTPvxTjMThj0QViUYFyp_wD5QZEuX3Jurx_QSrkWqwkakJTPxrvHyTvmtcwiJfPt7wm__zSDbqDKA_snz9Nl0wze71M6BnpVyoYDcYmJYE9AkFBRF03weFMF0nnY3qioL2ZzSU0T2hbcreAZXK1UrQEujBcN_-zU7_6FiXWlUptTwxHyfRZodozFjSqcSJvkqT3U_p3zTRbxAU61_dXhJkEPYplSv3NsfFcxf296iFsKxlu8P8Dhj_LF_Nj6e7GDI3W1zXZPEJKV9VT5SLkOSUus7e7sRjPtNuDZd3NNARpzHR8C9d0n23m06sufv5PE43urqjaEpCJJ0L8ZVLAJAiAfxNQVen-2mX-XIQwUBafmW8F4mRgmuto1pt66j__DplT5VEsEhU3nQ%3D%3D&Signature=Lgc%2BGqtL0rWC/hRjutw2r1c0IJg%3D'
  });

  Obs.putObject({
    Bucket: 'qrcode.dispensar',
    Body: {"oi": "teste"}
  }, function (err, result) {
    if (err) {
      console.error('Error-->' + err);
    } else {
      console.log(result)
      console.log('Status-->' + result.CommonMsg.status);
    }
  })
  
  res.send('test')
})