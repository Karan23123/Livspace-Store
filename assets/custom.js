/**
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 *
 * If you are an app developer and requires the theme to re-render the mini-cart, you can trigger your own event. If
 * you are adding a product, you need to trigger the "product:added" event, and make sure that you pass the quantity
 * that was added so the theme can properly update the quantity:
 *
 * document.documentElement.dispatchEvent(new CustomEvent('product:added', {
 *   bubbles: true,
 *   detail: {
 *     quantity: 1
 *   }
 * }));
 *
 * If you just want to force refresh the mini-cart without adding a specific product, you can trigger the event
 * "cart:refresh" in a similar way (in that case, passing the quantity is not necessary):
 *
 * document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
 *   bubbles: true
 * }));
 */

// Custom Livspace App Code
window.addEventListener('DOMContentLoaded', () => {
  let configPayload = {
       actionType: "UI_CHANGE",
       isMessageFromWebContext: true,
       isTitleHeaderVisible: !["index"].includes(window.theme.pageType),
       isMainHeaderVisible: ["index"].includes(window.theme.pageType),
       isBottomBarVisible: ["index"].includes(window.theme.pageType),
       headerTitle: window.theme.title
   }
  window.ReactNativeWebView?.postMessage(JSON.stringify(configPayload));
});
function AddtoCartProduct(variantid,qty)
  {
           $.ajax({
      type: 'POST', 
      url: '/cart/add.js',
      dataType: 'json', 
     data: {
  quantity: qty,
  id: variantid
},
      success: function (data) {
       
       if($('#mobilemenu').css('display')=='none')
       {
       fetch('/?view=minicart').then(response =>response.text()).then(data => $('#minicartpop').html(data));
        $('html,body').animate({
        scrollTop: $("#minicartpop").offset().top},
        'slow');        
        document.getElementById("minicartpop").style.display = "block"
        document.getElementById("backroun-blk").classList.add("backroun-blk");
       }
        $.ajax({
    type: 'GET',
    url: '/cart.json',
    dataType: 'json',
    success: function(data) { 
        
        var item_count = data.item_count;
        console.log("Item Count is:"+item_count);
      $("span#cartitemcount").each(function() { 
          $(this).text(item_count);
      });
    }
});
      },
      error: function (data) {alert(JSON.stringify(data));}
   });
  }

$(document).ready(function () {
    $(".wishlist").on('click', function () {
        $(this).addClass('Wishlisted');
    });
});

function addWishList(custid,parent_sku,variantid)
  {
   
     if(custid == 0)
     {
      window.location='/login?checkouturl='+window.location.pathname; 
     }
    else
     {
        $.ajax({
          url: "https://livespace.gadgets2watch.com/wishlist/update/"+custid+"/"+variantid+"/"+parent_sku,
          type: "PUT",
            dataType: 'json',
          cors: true ,          
          success: function(result) {
            // console.log("success");
            window.location='/pages/wishlist';              
          },
          error: function(error) {
            if(error.status==200)
            {
              window.location='/pages/wishlist';
            }            
          }
        });
     }    
  }

function notifyWishList(customer_id,variant_id)
  {
     $.ajax({
          url: "https://livespace.gadgets2watch.com/wishlist/notify/"+customer_id+"/"+variant_id,
          type: "POST",
           dataType: 'json',         
          success: function(result) {
           
            $('#wishlistthanks').modal('toggle');
          },
          error: function(error) {
            if(error.status==200)
            {
              $('#wishlistthanks').modal('toggle');
            }
          }
        });
  }
function deleteWishList(custid,variantid)
  {
      console.log("delete click working");
        $.ajax({
          url: "https://livespace.gadgets2watch.com/wishlist/delete/"+custid+"/"+variantid,
          type: "POST",
           dataType: 'json', 
          //data:{customer_id:custid,variant_id:variantid},
          success: function(result) {
            
             window.location='/pages/wishlist';
          },
          error: function(error) {
            if(error.status==200)
            {
              window.location='/pages/wishlist';
            }
          }
        });
    
  }
function topfunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
function copyordertext(elemid) {
 
  var reference_element = document.querySelector('#'+elemid);

	var range = document.createRange();  
	range.selectNodeContents(reference_element);

	window.getSelection().addRange(range);

	var success = document.execCommand('copy');
	if(success)
		console.log('Successfully copied to clipboard');
	else
		console.log('Unable to copy to clipboard');

	window.getSelection().removeRange(range);
}


    function setCookie(key, value, expiry) {
        var expires = new Date();
        expires.setTime(expires.getTime() + (expiry * 24 * 60 * 60 * 1000));
        document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
    }

    function getCookie(key) {
        var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
        return keyValue ? keyValue[2] : null;
    }

    function eraseCookie(key) {
        var keyValue = getCookie(key);
        setCookie(key, keyValue, '-1');
    }
function AddRecentSearch(searchterm)
  {
    var existingsearch='';
    if(getCookie('recent_searches_custom')!=null)
    {
      existingsearch=getCookie('recent_searches_custom');
    }
    var isexists=false;
    var searcharray=existingsearch.split('~');
    var newsearchval=searchterm+"~";
    for(var i=0;i<searcharray.length;i++)
    {
        if(searcharray[i]!=searchterm)
        {
          newsearchval+=searcharray[i]+"~";
          if(newsearchval.split('~').length==4)
          {
            break;
          }
        }
    }
    
      setCookie('recent_searches_custom',newsearchval,10);
    
  }

function GetRecentSearch()
  {
     var existingsearch=getCookie('recent_searches_custom');
     var searcharray=existingsearch.split('~');
    var isitemfound=false;
    var recentsearchhtml='<div class="search-recent-searches py-2"><h5>Recent Searches</h5><ul class="search-recent-searches-list list-unstyled p-0">'
    for(var i=0;i<searcharray.length;i++)
      {
        if(searcharray[i]!='')
        {
          isitemfound=true;
        recentsearchhtml+='<li><i class="fa fa-repeat" aria-hidden="true"></i><span><a href="search?q='+searcharray[i]+'">'+searcharray[i]+'</a></span></li>';        
        }
      }
    recentsearchhtml+='</ul></div><hr/>';
    if(isitemfound)
    {
      $('#recent-search').html(recentsearchhtml);
    }
  }
 $(document).ready(function () {
   GetRecentSearch();
 });
