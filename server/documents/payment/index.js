var dateFormat = require('dateformat');
module.exports = (data) => {
  const today = dateFormat(data.date, "yyyy-mm-dd");
  return `
    <!DOCTYPE html>

<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Receipt.</title>
  <style>
    .invoice-box {
      padding: 30px;
      margin: 0mm 16mm 0mm 16mm;
      border: 3px solid black;
      box-shadow: 0 0 10px rgba(0, 0, 0, .15);
      font-size: 16px;
      padding-bottom: 0px;
      line-height: 24px;
      font-family: 'Helvetica Neue''Helvetica',

    }

    .head {
      width: 100px;
      height: 50px;
    }

    .center {
      text-align: center;
    }

    .container {
      display: grid;
      grid-template-rows: 100px;
      grid-template-columns: 1fr 1fr;
    }

  </style>
</head>

<body>
  <div class="invoice-box">
    <div>
      <div class="center"><img src="https://i1.wp.com/govtjobtips.in/wp-content/uploads/2019/07/Untitled-3-1.png?w=628&ssl=1" class="head"></div>
      <h3 class="center">Gram Panchayat Kadadhe.</h3>
      <h3 class="center">Payment Receipt.</h3>
    </div>
    <hr>
    <div class="">
      <div>
        <p>Name:${data.name}</p>
      </div>
      <div>
        <div class=""><p>Mobile Number:${data.number}</p>
        </div>
        <div class="">
          <p>Date:${today}</p>
        </div>
        <div class="">
          <p>Amount:${data.amount}</p>
        </div>
        <div class="">
          <p>OrderId:${data.order_id}</p>
        </div>
        <div class="">
          <p>Reason:${data.forReason}</p>
        </div>
      </div>
    </div>
  </div>
</body>

</html>
  `
}