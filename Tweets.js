function Tweets(index_json, detail_json, user_data, minutes_rank) {
  this.data = {tweets: 0, detail: []};
  this.rank = minutes_rank;
  this.began_at = new Date(user_data.created_at.replace(/-/g, "/"));
  this.now = new Date(user_data.created_at.replace(/-/g, "/"));

  for(var i = index_json.length - 1; i >= 0; --i) {
    var tweets = detail_json[index_json[i].var_name];
    for(var j = 0; j < tweets.length; ++j){
      var jst_date = new Date(tweets[j].created_at.replace(/-/g, "/"));
      var year = jst_date.getFullYear() - began_at;
      var month = jst_date.getMonth();
      var day = jst_date.getDate() - 1;
      var day_of_the_week = jst_date.getDay();
      var hour = jst_date.getHours();
      var minute = Math.floor(jst_date.getMinutes() / this.rank);

      if(this.data.detail[year] == null) {
        this.data.detail[year] = {tweets: 0, detail: []};
      }
      if(this.data.detail[year].detail[month] == null) {
        this.data.detail[year].detail[month] = {tweets: 0, detail: [], detail2: []};
      }
      if(this.data.detail[year].detail[month].detail[day] == null) {
        this.data.detail[year].detail[month].detail[day] = {day_of_the_week: day_of_the_week, tweets: 0, detail: []};
      }
      if(this.data.detail[year].detail[month].detail[day].detail[hour] == null) {
        this.data.detail[year].detail[month].detail[day].detail[hour] = {tweets: 0, detail: []};
      }
      if(this.data.detail[year].detail[month].detail[day].detail[hour].detail[minute] == null) {
        this.data.detail[year].detail[month].detail[day].detail[hour].detail[minute] = {tweets: 0};
      }

      ++this.data.tweets;
      ++this.data.detail[year].tweets;
      ++this.data.detail[year].detail[month].tweets;
      ++this.data.detail[year].detail[month].detail[day].tweets;
      ++this.data.detail[year].detail[month].detail[day].detail[hour].tweets;
      ++this.data.detail[year].detail[month].detail[day].detail[hour].detail[minute].tweets;
    }
  }
}

Tweets.prototype.allTweets = function() {
  return this.data.tweets;
}

Tweets.prototype.reset = function() {
  this.now = new Date(this.began_at.toString());
}

Tweets.prototype.set = function(y, month, d, h, minutes) {
  if(minutes != null) {
    this.now = new Date(y, month - 1, d, h, minutes);
  } else if(h != null) {
    this.now = new Date(y, month - 1, d, h);
  } else if(d != null) {
    this.now = new Date(y, month - 1, d);
  } else if(month != null) {
    this.now = new Date(y, month - 1, 1);
  } else if(y != null) {
    this.now = new Date(y, 0, 1);
  } else {
    this.now = new Date();
  }
}

Tweets.prototype.get = function(date) {
  return this.now;
}

Tweets.prototype.at = function(span) {
  var tmp = this.data;
  var date = this.now;

  tmp = tmp.detail[date.getFullYear() - this.began_at.getFullYear()];
  if(tmp == null) {
    return 0;
  } else if(span == "year") {
    return tmp.tweets;
  }

  tmp = tmp.detail[date.getMonth()];
  if(tmp == null) {
    return 0;
  } else if(span == "month") {
    return tmp.tweets;
  }

  span = span.split("-");
  if(span[0] == "date") {
    tmp = tmp.detail[date.getDate()];
  } else if(span[0] == "day") {
    tmp = tmp.detail2[date.getDay()];
  } else {
    return 0;
  }
  span = span[1];
  if(tmp == null) {
    return 0;
  } else if (span == null) {
    return tmp.tweets;
  }

  tmp = tmp.detail[date.getHours()];
  if(tmp == null) {
    return 0;
  } else if(span == "hours") {
    return tmp.tweets;
  }

  tmp = tmp.detail[date.getMinutes()];
  if(tmp == null) {
    return 0;
  } else if(span == "minutes") {
    return tmp.tweets;
  }

  return 0;
}

Tweets.prototype.nextYear = function (){
  this.now.setFullYear(this.now.getFullYear() + 1)
}

Tweets.prototype.nextMonth = function (){
  this.now.setMonth(this.now.getMonth() + 1)
}

Tweets.prototype.nextDate = function (){
  this.now.setDate(this.now.getDate() + 1)
}

Tweets.prototype.nextHours = function (){
  this.now.setHours(this.now.getHours() + 1)
}

Tweets.prototype.nextMinutes = function (){
  this.now.setMinutes(this.now.getMinutes() + this.rank)
}