<template>
  <div class="col">
    <div v-for="sec in columnInfo">
      <div v-if="sec.itemViewMode === 1" v-show="sec.list.length>0" class="yearBag">
        <h4 @click="goSectionList(sec.id ,sec.itemType)">{{sec.itemName}}<span></span></h4>
        <div class="bagItem" v-for="item in sec.list" @click="goItemDetail(item.goodsNum,item.goodsId,item.goodsType)">
          <div class="left">
            <img :src="item.goodsImg">
            <span>{{item.goodsTitle}}</span>
          </div>
          <div class="right"></div>
        </div>
      </div>
      <div v-if="sec.itemViewMode === 4" v-show="sec.list.length>0" class="lectureRoom">
        <h4>{{sec.itemName}}</h4>
        <div class="lectureItem">
          <p v-for="item in sec.list" @click="goItemDetail(item.goodsNum,item.goodsId,item.goodsType)">
            {{item.goodsTitle}}</p>
        </div>
      </div>
      <div v-if="sec.itemViewMode === 3" v-show="sec.list.length>0" class="types">
        <div class="type1">
          <h4 @click="goSectionList(sec.id ,sec.itemType)">{{sec.itemName}}<span></span></h4>
          <div class="box">
            <div class="oneItem" v-for="item in sec.list"
                 @click="goItemDetail(item.goodsNum,item.goodsId,item.goodsType)">
              <div class="img_box">
                <img :src="item.goodsImg">
                <span v-if="sec.isTagView ===1">{{item.goodsType | cornerText}}</span>
              </div>
              <h3>{{item.goodsTitle}}</h3>
              <p>{{item.goodsAuthor}}</p>
              <h3 v-if="item.price>0 &&item.goodsType!==1 && item.goodsType!==11">{{item.price | formatPrice}}<span>¥15.00</span>
              </h3>
              <h3 v-if="item.price===0 &&item.goodsType!==1 && item.goodsType!==11"><a>限时免费</a></h3>
            </div>
          </div>
        </div>
      </div>
      <div v-if="sec.itemViewMode === 2" v-show="sec.list.length>0" class="types">
        <div class="type2">
          <h4 @click="goSectionList(sec.id ,sec.itemType)">{{sec.itemName}}<span></span></h4>
          <div class="list">
            <div class="list-item" v-for="item in sec.list"
                 @click="goItemDetail(item.goodsNum,item.goodsId,item.goodsType)">
              <div class="img_box">
                <img :src="item.goodsImg">
                <span v-if="sec.isTagView ===1">{{item.goodsType | cornerText}}</span>
              </div>
              <div>
                <h1>{{item.goodsTitle}}</h1>
                <h2>主讲人：{{item.goodsAuthor}}</h2>
                <p>{{item.goodsDesc}}</p>
                <h3 v-if="item.price>0 &&item.goodsType!==1 && item.goodsType!==11">{{item.price | formatPrice}}<span>¥15.00</span>
                </h3>
                <h3 v-if="item.price===0 &&item.goodsType!==1 && item.goodsType!==11"><a>限时免费</a></h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="sec.itemViewMode === 6" v-show="sec.list.length>0" class="subject-wrap">
        <h4 @click="goSectionList(sec.id ,sec.itemType)">{{sec.itemName}}<span></span></h4>
        <div class="subject">
          <div class="sub" v-for="item in sec.list"
               @click="goItemDetail(item.goodsNum,item.goodsId,item.goodsType)">
            <img :src="item.goodsImg">
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
      <div v-if="sec.itemViewMode === 6" v-show="sec.list.length>0" class="imgTopCol">
        <h4 @click="goSectionList(sec.id ,sec.itemType)">{{sec.itemName}}<span></span></h4>
        <div class="item">
          <img src="../../assets/images/img2.jpg">
          <div class="desc">
            <h2>学习茶的意义</h2>
            <p>中国茶文化有几千年的历史中国茶文化有几千年的历史中国茶文化有几千年的历史中国茶文化有几千年的历史中国茶文化有几千年的历史</p>
          </div>
        </div>
      </div>
      <div v-if="sec.itemViewMode === 7" class="addImg" v-for="item in sec.list"
           @click="goItemDetail(item.goodsNum,item.goodsId,item.goodsType)">
        <img :src="item.goodsImg">
      </div>
    </div>
  </div>
</template>
<style lang="less">
  .col h4{
    font-size:1.2rem;
    font-weight:normal;
  }

  .col h3{
    font-size:1.3rem;
    font-weight:normal;
  }

  /*年包*/
  .yearBag{
    background:#FFF;
    padding:1.5rem 1.5rem 0 1.5rem;
    margin-bottom:0.45rem;
  }

  .yearBag h4{
    background:url("../../assets/images/titleIcon.png") no-repeat;
    padding-left:2rem;
    background-size:1.1rem 1.1rem;
    margin-bottom:1.7rem;
  }

  .yearBag h4 span{
    background:url("../../assets/images/arrow.png") no-repeat;
    background-size:0.7rem 1rem;
    display:inline-block;
    width:0.7rem;
    height:1rem;
    float:right;
  }

  .yearBag .bagItem{
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    padding:1.4rem 0;
    border-top:solid 1px #f3f3f3;
  }

  .yearBag .bagItem .left{
    display:flex;
    justify-content:center;
    align-items:center;
  }

  .yearBag .bagItem .left img{
    width:4.3rem;
    height:4.3rem;
    border-radius:2px;
    margin-right:1rem;
  }

  .yearBag .bagItem .left span{
    font-size:1rem;
  }

  .yearBag .bagItem .right{
    background:url("../../assets/images/arrow.png") no-repeat;
    background-size:0.7rem 1rem;
    background-position:center center;
    display:inline-block;
    width:0.7rem;
    height:1rem;
  }

  /*中信大讲堂*/
  .lectureRoom{
    background:#FFF;
    padding:1.5rem 1.5rem 0 1.5rem;
    margin-bottom:0.45rem;
  }

  .lectureRoom h4{
    background:url("../../assets/images/titleIcon.png") no-repeat;
    padding-left:2rem;
    background-size:1.1rem 1.1rem;
    margin-bottom:1.7rem;
  }

  .lectureRoom .lectureItem p{
    padding:2rem 0 2rem 2.7rem;
    background:url("../../assets/images/lectureIcon.png") no-repeat;
    background-size:1.5rem 1.5rem;
    background-position:left center;
    border-top:solid 1px #f3f3f3;
    width:100%;
    box-sizing:border-box;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    -webkit-box-orient:vertical;
    font-size:1rem;
  }

  /*模块*/
  .type1 h4, .type2 h4{
    background:url("../../assets/images/titleIcon.png") no-repeat;
    background-size:1.1rem 1.1rem;
    background-position:0 center;
    padding:1.5rem 0 1.5rem 1.8rem;
    border-bottom:solid 1px #f3f3f3;

  }

  .type1 h4 span, .type2 h4 span{
    background:url("../../assets/images/arrow.png") no-repeat;
    background-size:0.7rem 1rem;
    display:inline-block;
    width:0.7rem;
    height:1rem;
    float:right;
  }

  .types .type1{
    background:#FFF;
    padding:0 4.75vw 1.5rem 4.75vw;
    margin-bottom:0.45rem;
  }

  .types .type1 .box{
    width:90.5vw;
    margin-top:1.5rem;
  }

  .types .type1 .box{
    display:flex;
    flex-direction:row;
    justify-content:flex-start;
  }

  .types .type1 .oneItem{
    width:25.5vw;
    margin-right:6vw;
  }

  .box .oneItem:nth-child(3n){
    margin-right:0;
  }

  .oneItem h3{
    font-size:1.1rem;
    color:#131313;
    margin-bottom:0.6rem;
    margin-top:1.1rem;
    /*background: #3f88c1;*/
    overflow:hidden;
    text-overflow:ellipsis;
    max-width:25.3vw;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:1;
  }

  .oneItem h3 span{
    margin-left:0.5rem;
    color:#949494;
    font-size:1rem;
    text-decoration:line-through;
  }

  .oneItem p{
    font-size:1rem;
    color:#999999;
    overflow:hidden;
    text-overflow:ellipsis;
    max-width:25.3vw;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:1;
  }

  .box .oneItem .img_box{
    position:relative;

  img{
    width:25.6vw;
    height:35vw;
    border:1px solid #d2d2d2;
    border-radius:5px;
  }

  span{
    position:absolute;
    right:-1px;
    /*top: 1rem;*/
    top:0;
    padding:0 0.5rem;
    height:1.7rem;
    line-height:1.7rem;
    text-align:center;
    display:inline-block;
    background:#d44340;
    font-size:1rem;
    color:#ffffff;
    font-weight:normal;
  }

  }
  /*.box .oneItem img{*/
  /*width: 27vw;*/
  /*height: 34.6vw;*/
  /*margin-top: 1.5rem;*/
  /*border: none;*/
  /*}*/

  .types .type2{
    background:#FFF;
    padding:0 4.75vw 1.5rem 4.75vw;
    margin-bottom:0.45rem;
  }

  .list{
    /*background: #F00;*/
  }

  .list-item{
    display:flex;
    justify-content:space-between;
    padding:1.4rem 0;
    /*padding: 0 3.75vw;*/
    /*margin-bottom: 1rem;*/
    border-bottom:solid 1px #f3f3f3;
  }

  .list-item .img_box{
    position:relative;
    width:25.3vw;
    height:34.6vw;
  }

  .list-item .img_box img{
    width:25.3vw;
    height:35vw;
    border-radius:5px;
    border-bottom:solid 1px #d2d2d2;
  }

  .list-item .img_box span{
    position:absolute;
    right:0;
    top:0;
    /*width: 3.7rem;*/
    padding:0 0.5rem;
    height:1.7rem;
    line-height:1.7rem;
    text-align:center;
    display:inline-block;
    background:#d44340;
    color:#ffffff;
    font-weight:normal;
  }

  .list-item div{
    /*display: inline-block;*/
    width:62.5vw;
    height:3rem;
    /*background: #F00;*/
    /*margin-top: 0.4rem;*/
  }

  .list-item div h1{
    font-size:1.2rem;
    color:#131313;
    font-weight:normal;
    margin-bottom:0.9rem;
    overflow:hidden;
    vertical-align:text-top;
    text-overflow:ellipsis;
    max-height:1.2rem;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:1;
  }

  .list-item div h2{
    font-size:1rem;
    color:#999999;
    font-weight:normal;
    margin-bottom:0.9rem;
    overflow:hidden;
    vertical-align:text-top;
    text-overflow:ellipsis;
    max-height:1.2rem;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:1;
  }

  .list-item div p{
    font-size:1rem;
    color:#5a5a5a;
    overflow:hidden;
    vertical-align:text-top;
    text-overflow:ellipsis;
    max-height:3rem;
    height:3rem;
    line-height:1.5rem;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
    margin-bottom:1.5rem;
  }

  .list-item div h3{
    text-align:right;
    color:#b81f3b;
  }

  .list-item h3 span{
    margin-left:0.5rem;
    color:#949494;
    font-size:1rem;
    text-decoration:line-through;
  }

  .list-item div h3 a{
    display:inline-block;
    font-size:1.3rem;
    color:#b81f3b;
    font-weight:normal;
    text-align:right;
  }

  /*专题*/
  .subject-wrap{
    background:#FFF;
    padding:1.5rem 4.64vw 0 4.64vw;
    margin-bottom:0.45rem;
  }

  .subject-wrap h4{
    background:url("../../assets/images/titleIcon.png") no-repeat;
    padding-left:2rem;
    background-size:1.1rem 1.1rem;
    margin-bottom:1.7rem;
    font-size:1.1rem;
  }

  .subject-wrap h4 span{
    background:url("../../assets/images/arrow.png") no-repeat;
    background-size:0.7rem 1rem;
    display:inline-block;
    width:0.7rem;
    height:1rem;
    float:right;
  }

  .subject-wrap .subject .sub{
    width:41.8vw;
    height:24.2vw;
    float:left;
    margin-bottom:3.9vw;
    border-radius:7px;
  }

  .subject-wrap .subject .sub img{
    width:41.8vw;
    height:24.2vw;
    border-radius:3px;
    display:inline-block;
  }

  .subject-wrap .subject .sub:nth-child(odd){
    margin-right:3.2vw;
  }

  .subject-wrap .subject .sub:nth-child(even){
    margin-left:3.2vw;
  }

  /*广告*/
  .addImg{
    background:#FFF;
    padding:0;
    margin-bottom:0.45rem;

  img{
    width:100%;
    height:11rem;
  }

  }
  /*通栏上图下文*/
  .imgTopCol{
    background:#FFF;
    padding:1.5rem 1.5rem 0 1.5rem;
    margin-bottom:0.45rem;
  }

  .imgTopCol h4{
    background:url("../../assets/images/titleIcon.png") no-repeat;
    padding-left:2rem;
    background-size:1.1rem 1.1rem;
    margin-bottom:1.7rem;
  }

  .imgTopCol h4 span{
    background:url("../../assets/images/arrow.png") no-repeat;
    background-size:0.7rem 1rem;
    display:inline-block;
    width:0.7rem;
    height:1rem;
    float:right;
  }

  .imgTopCol .item{
    padding:1.4rem 0;
    border-top:solid 1px #f3f3f3;
  }

  .imgTopCol .item img{
    width:100%;
    height:9.2rem;
    border-radius:6px;
  }

  .imgTopCol .item div.desc h2{
    font-size:1.4rem;
    color:#323232;
    margin:0.7rem 0;
    overflow:hidden;
    text-overflow:ellipsis;
    max-width:100%;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:1;
  }

  .imgTopCol .item div.desc p{
    font-size:1.2em;
    color:#6c6c6c;
    line-height:1.5;
    overflow:hidden;
    text-overflow:ellipsis;
    max-width:100%;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:3;
  }
</style>
<script>
  import "whatwg-fetch"

  export default {
    data(){
      return {
        columnInfo:[] ,
      }
    } ,
    created(){
      var $this = this
      $this.getColumnInfo()
    } ,
    methods:{
      getColumnInfo(){
        var $this = this
        fetch(apiHost + '/caapiv2/getCategoryList' , {
          credentials:'same-origin' ,
          method:'POST' ,
          headers:{
            'Content-Type':'application/json'
          }
        }).then(function (tresponse){
          return tresponse.json()
        }).then(function (tjson){
          if (tjson.data && tjson.data.length > 0) {
            for (var i = 0 ; i < tjson.data.length ; i++) {
              $this.columnInfo.push(Object.assign(tjson.data[i] , {list:[]}))
              $this.getItems(tjson.data[i].id , tjson.data[i].itemType , i)
            }
          }
        })
      } ,
      getItems(id , type , i){
        var $this = this
        fetch(apiHost + '/caapiv2/getTopList' , {
          credentials:'same-origin' ,
          method:'POST' ,
          headers:{
            'Content-Type':'application/json'
          } ,
          body:JSON.stringify({
            "id":id ,
            "itemType":type ,
            "pageIndex":1 ,
            "step":99
          })
        }).then(function (tresponse){
          return tresponse.json()
        }).then(function (tjson){
          if (tjson.data && tjson.data.list.length > 0) {
            if ($this.columnInfo[i].itemViewMode == 5) {
              $this.columnInfo[i].list = tjson.data.list.slice(0 , 1)
            } else if ($this.columnInfo[i].itemViewMode == 3 || $this.columnInfo[i].itemViewMode == 2 || $this.columnInfo[i].itemViewMode == 1) {
              $this.columnInfo[i].list = tjson.data.list.slice(0 , 3)
            } else if ($this.columnInfo[i].itemViewMode == 4) {
              $this.columnInfo[i].list = tjson.data.list.slice(0 , 6)
            } else if ($this.columnInfo[i].itemViewMode == 6) {
              $this.columnInfo[i].list = tjson.data.list.slice(0 , 4)
            } else {
              $this.columnInfo[i].list = tjson.data.list
            }
          }
        })
      } ,
      goSectionList(sectionId , sectionType){
        window.location.href = "/section/" + sectionId + "?s_type=" + sectionType
      } ,
      goItemDetail(itemNum , itemId , sectionType){
        if (sectionType === 2 || sectionType === 3 || sectionType === 4 || sectionType === 12) {
          window.location.href = "item/" + itemNum + "?s_type=" + sectionType
        } else {
          if (sectionType === 0 || sectionType === 11) {
            sectionType = 1
          }
          window.location.href = "item/" + itemId + "?s_type=" + sectionType
        }
      } ,
      goAddDetail(src){
        window.location.href = src
      }
    }
  }
</script>
