export default {
  port: 9000,
  host: "localhost",
  dbUrl: "mongodb://lmo:asdffdsa@127.0.0.1:27017/local-pos?authSource=admin",
  saltWorkFactor: 10,
  secretKey: "suuhh",
  page_limit: 50,
  mqttUrl: "mqqt://127.0.0.1:1883",
  // mqttUrl: "ws://192.168.0.100:9001",

  mqttUserName: "detpos",
  mqttPassword: "asdffdsa",
  // serverUrl: "https://detfsmm.com",
  // detailsaleCloudUrl: "https://detfsmm.com/api/detail-sale",
  // tankDataCloudUrl: "https://detfsmm.com/api/tank-data111",
  tankDataUrl : "http://192.168.0.109:8080/baseOilcan",
  //coustomerCloudUrl: "http://detfsmm.com:9000/api/customer",
  // coustomerCloudUrl: "https://detfsmm.com/api/customer/local-create",
  // debtCloudUrl: "https://detfsmm.com/api/debt/local-create",
};