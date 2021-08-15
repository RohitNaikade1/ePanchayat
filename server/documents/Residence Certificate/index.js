module.exports = (data) => {
    const today = new Date();
    const logo = "ashoka pillar.png";
    return `
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            .head {
                width: 100px;
                height: 100px;
            }
            .head1 {
                width: 100px;
                height: 100px;
            }
    
            .invoice-box {
                padding: 30px;
                margin: 10mm 16mm 0mm 16mm;
                border: 3px solid black;
                box-shadow: 0 0 10px rgba(0, 0, 0, .15);
                font-size: 16px;
                line-height: 24px;
                font-family: 'Helvetica Neue''Helvetica',
    
            }
    
            .container {
                display: grid;
                grid-template-rows: 100px;
                grid-template-columns: 1fr 1fr;
            }
    
            .cmp {
                position: absolute;
                right: 150px;
            }
            .right {
                text-align: right;
            }
    
            .header {
                display: flexbox;
            }
    
            .center {
                text-align: center;
            }
    
            .paragraph {
                text-indent: 10em;
                line-height: 30pt;
                word-spacing: 5px;
            }

        </style>
    </head>
    
    <body>
        <div class="invoice-box">
            <div class="center">
                <img src="https://i1.wp.com/govtjobtips.in/wp-content/uploads/2019/07/Untitled-3-1.png?w=628&ssl=1" class="head">
                <h3 class="center">Gram Panchayat Office:Kadadhe.</h3>
                <h3 class="center">Taluka:Khed,Dist:Pune.</h3>
            </div>
            <hr>
            <div class="center">
                <h3 class="center">Residence Self-Declaration Letter.</h3>
            </div>
            <div class="">
                <img class="head1 cmps" src=${data.picture} />
            </div>
    
            <div>
                <p class="paragraph">I Mr. /Mrs./Ms ${data.name} Age ${data.age} years , aadhar no. ${data.UID} , occupation ${data.profession} , 
                residing at a/p:kadadhe , tal:khed , dist:pune  do hereby declare that I have been resident of village  kadadhe, taluka khed, district pune-413102 
                 since ${data.years} years.<br>
                 The above provided particulars are true and valid. 
                 If the facts provided above turn out to be invalid, I would be responsible for deed, 
                 and would liable to the punishments as prescribed in Indian penal code and/Or other related laws.
                  Besides this, all the benefits related to this self declaration certificate would be declared null and void.
                </p>
            </div>
            <div style="float:right;">
                <div>
                    <p>Applicant's Signature:</p>
                </div>
                <div>
                    <p>Applicant's Name:${data.name}</p>
                </div>
            </div>
            <div>
                <div>
                    <p>Place:Kadadhe.</p>
                </div>
                <div>
                    <p>Date:${`${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}.`}</p>
                </div>
            </div>
        </div>
    
    </body>
    
    </html>
  `
}