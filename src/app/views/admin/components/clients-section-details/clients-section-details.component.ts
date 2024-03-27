import { Component } from '@angular/core';

@Component({
  selector: 'app-clients-section-details',
  templateUrl: './clients-section-details.component.html',
  styleUrls: ['./clients-section-details.component.scss']
})
export class ClientsSectionDetailsComponent {

    usersList:any[]=[
      {
        "name":"Prahim",
        "age" :24,
        "email" : "ibrahimrabah25@gmail.com",
        "mobile" : "01090386165",
        "pincode" :"abc12p"
      },
      {
        "name":"Ahmed",
        "age" :26,
        "email" : "Ahmedrabah25@gmail.com",
        "mobile" : "01090386165",
        "pincode" :"abc12p"
      },
      {
        "name":"Mhmd",
        "age" :30,
        "email" : "Mhmdrabah25@gmail.com",
        "mobile" : "01090386165",
        "pincode" :"abc12p"
      },
      {
        "name":"Mhmud",
        "age" :40,
        "email" : "Mhmudrabah25@gmail.com",
        "mobile" : "01090386165",
        "pincode" :"abc12p"
      },
      {
        "name":"Mo'men",
        "age" :25,
        "email" : "Mo'menrabah25@gmail.com",
        "mobile" : "01090386165",
        "pincode" :"abc12p"
      },{
        "name":"Sara",
        "age" :46,
        "email" : "Sararabah25@gmail.com",
        "mobile" : "01090386165",
        "pincode" :"abc12p"
      },{
        "name":"Tamer",
        "age" :24,
        "email" : "Tamerrabah25@gmail.com",
        "mobile" : "01090386165",
        "pincode" :"abc12p"
      },{
        "name":"Ramy",
        "age" :26,
        "email" : "Ramyrabah25@gmail.com",
        "mobile" : "01090386165",
        "pincode" :"abc12p"
      },{
        "name":"Ramz",
        "age" :24,
        "email" : "Ramzrabah25@gmail.com",
        "mobile" : "01090386165",
        "pincode" :"abc12p"
      },{
        "name":"samir",
        "age" :27,
        "email" : "samirrabah25@gmail.com",
        "mobile" : "01090386165",
        "pincode" :"abc12p"
      },{
        "name":"samira",
        "age" :28,
        "email" : "samirarabah25@gmail.com",
        "mobile" : "01090386165",
        "pincode" :"abc12p"
      },{
        "name":"saber",
        "age" :20,
        "email" : "saberrabah25@gmail.com",
        "mobile" : "01090386165",
        "pincode" :"abc12p"
      },{
        "name":"sabry",
        "age" :39,
        "email" : "sabryrabah25@gmail.com",
        "mobile" : "01090386165",
        "pincode" :"abc12p"
      }

    ]

  clear(table: any) {
    table.clear();
  }
}
