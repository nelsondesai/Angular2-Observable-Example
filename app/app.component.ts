/// <reference path="../typings/tsd.d.ts" />
import {Component} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {ControlGroup, FormBuilder} from 'angular2/common';

@Component({
    selector: 'my-app',
    template: `
        <form [ngFormModel]="form">
            <label>Search:</label>
            <input type="text" ngControl="search">     
        </form>        
    `
})
export class AppComponent {
   form:ControlGroup;
   constructor(fb:FormBuilder)
   {
       this.form = fb.group({
           search:[]
       });
       
       //var observable =Observable.fromArray([1,2,3]);
       
       var startDates = [];
       var startDate = new Date();
       
       for (var day = -2; day <=2 ; day++)
       {
           var date = new Date(
               startDate.getFullYear(),
               startDate.getMonth(),
               startDate.getDate()+day
           );
           startDates.push(date);
       }	
       var observable = Observable.fromArray(startDates)
                                   .map(date => {
                                        console.log("Getting deals for date " + date);  
                                       return [1,2,3];
                                   })
                                   .subscribe( x => console.log(x));
       var observable1 = Observable.interval(1000);
       observable1.subscribe( x => console.log(x));
       
       var observable2 = Observable.interval(1000);
       observable2.flatMap( x => {
                                console.log("Calling the server to get latest news"); 
                                return Observable.of([1,2,3]); 
                            })
       .subscribe( news => console.log(news));      
       
       var userStream = Observable.of({userId:1, username:'nelson'}).delay(2000);                     
       var tweetsStream = Observable.of([1,2,3]).delay(1500);                            
       Observable.forkJoin(userStream, tweetsStream)
       .map(joined => new Object({usr:joined[0], tweets: joined[1]}))
       .subscribe( result => console.log(result)); 
                           
       var search = this.form.find('search');
       search.valueChanges
       .debounceTime(400)
       .map( str => (<string>str).replace(' ','-'))
       .subscribe(x => console.log(x));
   }
   
}