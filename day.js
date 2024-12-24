export function dayjs() {
  let day = {
    today: new Date(),
    add:function (time,length){
    
    let added;
    let dateFromEpoch;
    
      if(length=='days') {
        
      added =day.today.getDate()
      
     day.today = day.today.setDate(added+time)
     
     dateFromEpoch= new Date(day.today)
        
   day.today = dateFromEpoch
      }
  else if(length=='minutes'){
        
        added =day.today.getMinutes()
      
     day.today = day.today.setMinutes(added+time)
     
     dateFromEpoch= new Date(day.today)
     
   day.today = dateFromEpoch
      }
      return day;
    },
    format:function (dateString) {
      
      let siku = day.today.getDay();
      
      switch(siku){
        case 0:
        siku = 'Sunday';
        break;
        
        case 1:
        siku = 'Monday'
        break;
        
        case 2:
        siku = 'Tuesday';
        break;
        
        case 3:
        siku = 'Wednesday'
        break;
        
        case 4:
        siku = 'Thursday';
        break;
        
        case 5:
        siku = 'Friday';
        break;
        
        case 6:
        siku = 'Saturday';
        break;
      }
      
      let month = day.today.getMonth();
      
      switch(month){
        case 0:
        month = 'January'
        break;
        
        case 1:
        month = 'February';
        break;
        
        case 2:
        month = 'March'
        break;
        
        case 3:
        month = 'April';
        break;
        
        case 4:
        month = 'May';
        break;
        
        case 5:
        month = 'June';
        break;
        
        case 6:
        month = 'July';
        break;
        
        case 7:
        month = 'August'
        break;
        
        case 8:
        month = 'September';
        break;
        
        case 9:
        month = 'October'
        break;
        
        case 10:
        month = 'November';
        break;
        
        case 11:
        month = 'December';
        break;
        
      }
      
      let date = day.today.getDate();
      
      if (dateString==='dddd, MMMM D') {
        return `${siku}, ${month} ${date}`
      }
    }
  }
  
  return day
}

