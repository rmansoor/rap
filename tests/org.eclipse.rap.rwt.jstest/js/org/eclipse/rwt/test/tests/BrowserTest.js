/*******************************************************************************
 * Copyright (c) 2010, 2012 EclipseSource and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    EclipseSource - initial API and implementation
 ******************************************************************************/

/*global foo:true */
/*jshint scripturl:true, delete:false */


(function(){

var TestUtil = org.eclipse.rwt.test.fixture.TestUtil;

qx.Class.define( "org.eclipse.rwt.test.tests.BrowserTest", {

  extend : qx.core.Object,

  members : {

    BLANK : "../rwt-resources/resource/static/html/blank.html",
    URL1 : "http://www.eclipse.org/rap",

    testCreateBrowserByProtocol : function() {
      var shell = TestUtil.createShellByProtocol( "w2" );
      var processor = rwt.protocol.MessageProcessor;
      processor.processOperation( {
        "target" : "w3",
        "action" : "create",
        "type" : "rwt.widgets.Browser",
        "properties" : {
          "style" : [],
          "parent" : "w2"
        }
      } );
      var ObjectManager = rwt.protocol.ObjectManager;
      var widget = ObjectManager.getObject( "w3" );
      assertTrue( widget instanceof rwt.widgets.Browser );
      assertIdentical( shell, widget.getParent() );
      assertTrue( widget.getUserData( "isControl") );
      shell.destroy();
      widget.destroy();
    },

    testSetHasProgressListenerByProtocol : function() {
      var shell = TestUtil.createShellByProtocol( "w2" );
      var processor = rwt.protocol.MessageProcessor;
      processor.processOperation( {
        "target" : "w3",
        "action" : "create",
        "type" : "rwt.widgets.Browser",
        "properties" : {
          "style" : [],
          "parent" : "w2"
        }
      } );
      TestUtil.protocolListen( "w3", { "progress" : true } );
      var ObjectManager = rwt.protocol.ObjectManager;
      var widget = ObjectManager.getObject( "w3" );
      assertTrue( widget._hasProgressListener );
      shell.destroy();
      widget.destroy();
    },

    testSetUrlByProtocol :  [
      function() {
        TestUtil.createShellByProtocol( "w2" );
        var processor = rwt.protocol.MessageProcessor;
        processor.processOperation( {
          "target" : "w3",
          "action" : "create",
          "type" : "rwt.widgets.Browser",
          "properties" : {
            "style" : [],
            "parent" : "w2",
            "url" : this.URL1
          }
        } );
        TestUtil.delayTest( 7000 );
        var browser = rwt.protocol.ObjectManager.getObject( "w3" );
        TestUtil.store( browser );
      },
      function( browser ) {
        assertEquals( this.URL1, browser.getSource() );
        assertTrue( "slow connection?", browser._isLoaded );
        browser.destroy();
      }
    ],

    testGetDomain : function() {
      var url1 = "HTtp://google.de/";
      var url2 =   "http://www.sub.somedomain.com:84/"
                 + "example/document.html?param=value&param2=%20value2";
      var url3 = "https://amazon.com";
      var url4 = "FTPS://mydomain.cOM";
      var domain1 = rwt.widgets.Browser.getDomain( url1 );
      var domain2 = rwt.widgets.Browser.getDomain( url2 );
      var domain3 = rwt.widgets.Browser.getDomain( url3 );
      var domain4 = rwt.widgets.Browser.getDomain( url4 );
      assertEquals( "google.de", domain1 );
      assertEquals( "www.sub.somedomain.com:84", domain2 );
      assertEquals( "amazon.com", domain3 );
      assertEquals( "mydomain.com", domain4 );
    },

    testGetDomainFails : function() {
      // url1/2 are assumed to be relative
      var url1 = "htp://google.de/";
      var url2 = "ftp.www.sub.somedomain.com:84";
      var domain1 = rwt.widgets.Browser.getDomain( url1 );
      var domain2 = rwt.widgets.Browser.getDomain( url2 );
      var domain3 = rwt.widgets.Browser.getDomain( null );
      assertNull( domain1 );
      assertNull( domain2 );
      assertNull( domain3 );
    },

    testExecute :  [
      function() {
        var browser = this._createBrowser();
        TestUtil.delayTest( 600 );
        TestUtil.store( browser );
      },
      function( browser ) {
        //NOTE: Using "_isLoaded" instead of "isLoaded" because of IE.
        assertTrue( "slow connection?", browser._isLoaded );
        TestUtil.initRequestLog();
        var win = browser.getContentWindow();
        assertNotNull( win );
        assertTrue( typeof foo === "undefined" );
        foo = 17;
        // Note: Using this line would fail in firefox, no workaround known:
        //browser.execute( "foo = 33;" );
        browser.execute( "window.foo = 33;" );
        assertEquals( 17, foo );
        assertEquals( 33, win.foo );
        assertTrue( TestUtil.getMessageObject().findSetProperty( "w6", "executeResult" ) );
        browser.destroy();
        delete foo;
      }
    ],

    testEvaluateByProtocol :  [
      function() {
        TestUtil.createShellByProtocol( "w2" );
        rwt.protocol.MessageProcessor.processOperation( {
          "target" : "w3",
          "action" : "create",
          "type" : "rwt.widgets.Browser",
          "properties" : {
            "style" : [],
            "parent" : "w2"
          }
        } );
        TestUtil.delayTest( 1000 );
        var browser = rwt.protocol.ObjectManager.getObject( "w3" );
        TestUtil.store( browser );
      },
      function( browser ) {
        assertTrue( "slow connection?", browser._isLoaded );
        TestUtil.initRequestLog();
        rwt.protocol.MessageProcessor.processOperation( {
          "target" : "w3",
          "action" : "call",
          "method" : "evaluate",
          "properties" : {
            "script" : "33;"
          }
        } );
        assertTrue( TestUtil.getMessageObject().findSetProperty( "w3", "executeResult" ) );
        // TODO [tb] : use real json array
        assertEquals( "[33]", TestUtil.getMessageObject().findSetProperty( "w3", "evaluateResult" ) );
        browser.destroy();
      }
    ],

    testCreateDestroyBrowserFunctionByProtocol :  [
      function() {
        TestUtil.createShellByProtocol( "w2" );
        var browser = this._createBrowserByProtocol( "w3", "w2" );
        TestUtil.delayTest( 1000 );
        TestUtil.store( browser );
      },
      function( browser ) {
        assertTrue( "slow connection?", browser._isLoaded );
        TestUtil.initRequestLog();
        rwt.protocol.MessageProcessor.processOperation( {
          "target" : "w3",
          "action" : "call",
          "method" : "createFunctions",
          "properties" : {
            "functions" : [ "abc" ]
          }
        } );
        var win = browser.getContentWindow();
        assertTrue( typeof( win.abc ) === "function" );
        assertTrue( typeof( win.abc_impl ) === "function" );
        rwt.protocol.MessageProcessor.processOperation( {
          "target" : "w3",
          "action" : "call",
          "method" : "destroyFunctions",
          "properties" : {
            "functions" : [ "abc" ]
          }
        } );
        assertTrue( typeof( win.abc ) === "undefined" );
        assertTrue( typeof( win.abc_impl ) === "undefined" );
        browser.destroy();
      }
    ],

    testExecuteFailed :  [
      function() {
        var browser = this._createBrowser();
        TestUtil.delayTest( 1000 );
        TestUtil.store( browser );
      },
      function( browser ) {
        assertTrue( "slow connection?", browser._isLoaded );
        TestUtil.initRequestLog();
        browser.execute( "for(){}" );
        assertFalse( TestUtil.getMessageObject().findSetProperty( "w6", "executeResult" ) );
        browser.destroy();
        delete window.foo;
      }
    ],

    testEvaluateReturnsRegexp :  [
      function() {
        var browser = this._createBrowser();
        TestUtil.delayTest( 1000 );
        TestUtil.store( browser );
      },
      function( browser ) {
        assertTrue( "slow connection?", browser._isLoaded );
        TestUtil.initRequestLog();
        browser.execute( "/regexp/;" );
        assertNull( TestUtil.getMessageObject().findSetProperty( "w6", "evaluateResult" ) );

        browser.destroy();
      }
    ],

    testEvaluateReturnsMap :  [
      function() {
        var browser = this._createBrowser();
        TestUtil.delayTest( 1000 );
        TestUtil.store( browser );
      },
      function( browser ) {
        assertTrue( "slow connection?", browser._isLoaded );
        TestUtil.initRequestLog();
        browser.execute( "( function(){ return {};})();" );
        assertNull( TestUtil.getMessageObject().findSetProperty( "w6", "evaluateResult" ) );
        assertTrue( TestUtil.getMessageObject().findSetProperty( "w6", "executeResult" ) );
        browser.destroy();
      }
    ],

    testEvaluateReturnsArray :  [
      function() {
        var browser = this._createBrowser();
        TestUtil.delayTest( 1000 );
        TestUtil.store( browser );
      },
      function( browser ) {
        assertTrue( "slow connection?", browser._isLoaded );
        TestUtil.initRequestLog();
        browser.execute( "( function(){ return [ 1,2,3 ]; } )();" );
        var expected = "[[1,2,3]]";
        assertTrue( TestUtil.getMessageObject().findSetProperty( "w6", "executeResult" ) );
        assertEquals( expected, TestUtil.getMessageObject().findSetProperty( "w6", "evaluateResult" ) );
        browser.destroy();
      }
    ],

    testEvaluateReturnsFunction :  [
      function() {
        var browser = this._createBrowser();
        TestUtil.delayTest( 1000 );
        TestUtil.store( browser );
      },
      function( browser ) {
        assertTrue( "slow connection?", browser._isLoaded );
        TestUtil.initRequestLog();
        browser.execute( "( function(){ return function(){}; } )();" );
        assertTrue( TestUtil.getMessageObject().findSetProperty( "w6", "executeResult" ) );
        assertEquals( "[[]]", TestUtil.getMessageObject().findSetProperty( "w6", "evaluateResult" ) );
        browser.destroy();
      }
    ],

    testExecuteSecurityException : [
      function() {
        var browser = this._createBrowser();
        browser.setSource( "http://www.google.de/" );
        browser.syncSource();
        TestUtil.delayTest( 1000 );
        TestUtil.store( browser );
      },
      function( browser ) {
        var error = null;
        try {
          browser.execute( "alert(\" This should not happen\" );" );
          fail();
        } catch( ex ) {
          error = ex;
        }
        assertTrue( error !== null );
      }
    ],

    testBrowserFunctionSecurityExceptionInResponse : [
      function() {
        var browser = this._createBrowser();
        browser.setSource( "http://www.google.de/" );
        browser.syncSource();
        TestUtil.delayTest( 1000 );
        TestUtil.store( browser );
      },
      function( browser ) {
        org.eclipse.swt.EventUtil.setSuspended( true );
        var error = null;
        try {
          browser.createFunction( "abc" );
        } catch( ex ) {
          error = ex;
        }
        org.eclipse.swt.EventUtil.setSuspended( false );
        assertTrue( error !== null );
      }
    ],

    testCreateDestroyBrowserFunction :  [
      function() {
        var browser = this._createBrowser();
        TestUtil.delayTest( 1000 );
        TestUtil.store( browser );
      },
      function( browser ) {
        assertTrue( "slow connection?", browser._isLoaded );
        TestUtil.initRequestLog();
        browser.createFunction( "abc" );
        var win = browser.getContentWindow();
        assertTrue( typeof( win.abc ) === "function" );
        assertTrue( typeof( win.abc_impl ) === "function" );
        browser.destroyFunction( "abc" );
        assertTrue( typeof( win.abc ) === "undefined" );
        assertTrue( typeof( win.abc_impl ) === "undefined" );
        browser.destroy();
      }
    ],

    testCreateBrowserFunctionBeforeLoaded :  [
      function() {
        var browser = this._createBrowser();
        browser.createFunction( "abc" );
        TestUtil.delayTest( 1000 );
        TestUtil.store( browser );
      },
      function( browser ) {
        assertTrue( "slow connection?", browser._isLoaded );
        TestUtil.initRequestLog();
        var win = browser.getContentWindow();
        assertTrue( typeof( win.abc ) === "function" );
        assertTrue( typeof( win.abc_impl ) === "function" );
        browser.destroy();
      }
    ],

    testCreateBrowserFunctionThenNavigate :  [
      function() {
        var browser = this._createBrowser();
        browser.setSource( "javascript:false;" );
        TestUtil.delayTest( 1000 );
        TestUtil.store( browser );
      },
      function( browser ) {
        browser.createFunction( "abc" );
        browser.getIframeNode().src = this.BLANK;
        TestUtil.delayTest( 1000 );
        TestUtil.store( browser );
      },
      function( browser ) {
        assertTrue( "slow connection?", browser._isLoaded );
        TestUtil.initRequestLog();
        var win = browser.getContentWindow();
        assertTrue( typeof( win.abc ) === "function" );
        assertTrue( typeof( win.abc_impl ) === "function" );
        browser.destroy();
      }
    ],

    testCreateDestroyBrowserFunctionThenNavigate :  [
      function() {
        var browser = this._createBrowser();
        TestUtil.delayTest( 600 );
        TestUtil.store( browser );
      },
      function( browser ) {
        assertTrue( "slow connection?", browser._isLoaded );
        TestUtil.initRequestLog();
        browser.createFunction( "abc" );
        browser.destroyFunction( "abc" );
        browser.reload();
        TestUtil.delayTest( 600 );
        TestUtil.store( browser );
      },
      function( browser ) {
        var win = browser.getContentWindow();
        assertTrue( typeof( win.abc ) === "undefined" );
        assertTrue( typeof( win.abc_impl ) === "undefined" );
        browser.destroy();
      }
    ],

    testCreateBrowserFunctionThenSetSourceToOtherDomain :  [
      function() {
        var browser = this._createBrowser();
        TestUtil.delayTest( 1000 );
        TestUtil.store( browser );
      },
      function( browser ) {
        assertTrue( "slow connection?", browser._isLoaded );
        browser.createFunction( "abc" );
        browser.setSource( this.URL1 );
        browser.syncSource();
        TestUtil.delayTest( 7000 );
        TestUtil.store( browser );
      },
      function( browser ) {
        assertTrue( "slow connection?", browser._isLoaded );
        assertNull( TestUtil.getErrorPage() );
        browser.destroy();
      }
    ],

    testCreateBrowserFunctionThenNavigateToOtherDomain :  [
      function() {
        var browser = this._createBrowser();
        TestUtil.delayTest( 1000 );
        TestUtil.store( browser );
      },
      function( browser ) {
        assertTrue( "slow connection?", browser._isLoaded );
        browser.createFunction( "abc" );
        browser.getIframeNode().onload = function() {
          browser.setUserData( "nativeLoaded", true );
        };
        // Simulates navigation: source stays the same, no load event
        // since the "load" flag is already true:
        browser.getIframeNode().src = this.URL1;
        TestUtil.delayTest( 10000 );
        TestUtil.store( browser );
      },
      function( browser ) {
        if( !qx.core.Variant.isSet( "qx.client", "mshtml" ) ) {
          assertTrue( "native loaded?", browser.getUserData( "nativeLoaded" ) );
        }
        assertNull( TestUtil.getErrorPage() );
        browser.destroy();
      }
    ],

    testNavigateToOtherDomainThenCreateBrowserFunction :  [
      function() {
        var browser = this._createBrowser();
        TestUtil.delayTest( 1000 );
        TestUtil.store( browser );
      },
      function( browser ) {
        assertTrue( "slow connection?", browser._isLoaded );
        browser.getIframeNode().onload = function() {
          browser.setUserData( "nativeLoaded", true );
        };
        browser.getIframeNode().src = this.URL1;
        TestUtil.delayTest( 7000 );
        TestUtil.store( browser );
      },
      function( browser ) {
        // NOTE: Some IE dont fire a load event for this scenario,
        //       therefore can not check that side is loaded,
        //       could lead to false negative (red) test
        if( !qx.core.Variant.isSet( "qx.client", "mshtml" ) ) {
          assertTrue( "native loaded?", browser.getUserData( "nativeLoaded" ) );
        }
        var error = null;
        try{
          browser.createFunction( "abc" );
        }catch( ex ) {
          error = ex;
        }
        assertNotNull( error );
      }
    ],

    testBrowserFunctionFailed :  [
      function() {
        var browser = this._createBrowser();
        TestUtil.delayTest( 1000 );
        TestUtil.store( browser );
      },
      function( browser ) {
        assertTrue( "slow connection?", browser._isLoaded );
        TestUtil.initRequestLog();
        browser.createFunction( "abc" );
        var win = browser.getContentWindow();
        assertTrue( typeof( win.abc ) === "function" );
        assertTrue( typeof( win.abc_impl ) === "function" );
        TestUtil.scheduleResponse( function() {
          browser.setFunctionResult( "abc", null, "error" );
        } );
        try {
          win.abc();
          throw "Browser function should throw an error";
        } catch( e ) {
          assertEquals( "error", e.message );
        }
        browser.destroy();
      }
    ],

    testBrowserFunctionSucceed  :  [
      function() {
        var browser = this._createBrowser();
        TestUtil.delayTest( 1000 );
        TestUtil.store( browser );
      },
      function( browser ) {
        assertTrue( "slow connection?", browser._isLoaded );
        TestUtil.initRequestLog();
        browser.createFunction( "abc" );
        var win = browser.getContentWindow();
        assertTrue( typeof( win.abc ) === "function" );
        assertTrue( typeof( win.abc_impl ) === "function" );
        TestUtil.scheduleResponse( function() {
          browser.setFunctionResult( "abc", "result", null );
        } );
        try {
          var result = win.abc();
          assertEquals( "result", result );
        } catch( e ) {
          throw "Browser function shouldn't throw an error";
        }
        browser.destroy();
      }
    ],

    testBrowserFunctionFailedByProtocol :  [
      function() {
        TestUtil.createShellByProtocol( "w2" );
        var browser = this._createBrowserByProtocol( "w3", "w2" );
        TestUtil.delayTest( 1000 );
        TestUtil.store( browser );
      },
      function( browser ) {
        assertTrue( "slow connection?", browser._isLoaded );
        TestUtil.initRequestLog();
        rwt.protocol.MessageProcessor.processOperation( {
          "target" : "w3",
          "action" : "call",
          "method" : "createFunctions",
          "properties" : {
            "functions" : [ "abc" ]
          }
        } );
        var win = browser.getContentWindow();
        assertTrue( typeof( win.abc ) === "function" );
        assertTrue( typeof( win.abc_impl ) === "function" );
        TestUtil.scheduleResponse( function() {
          TestUtil.protocolSet( "w3", { "functionResult" : [ "abc", null, "error" ] } );
        } );
        try {
          win.abc();
          throw "Browser function should throw an error";
        } catch( e ) {
          assertEquals( "error", e.message );
        }
        browser.destroy();
      }
    ],

    testBrowserFunctionSucceedByProtocol  :  [
      function() {
        TestUtil.createShellByProtocol( "w2" );
        var browser = this._createBrowserByProtocol( "w3", "w2" );
        TestUtil.delayTest( 1000 );
        TestUtil.store( browser );
      },
      function( browser ) {
        assertTrue( "slow connection?", browser._isLoaded );
        TestUtil.initRequestLog();
        rwt.protocol.MessageProcessor.processOperation( {
          "target" : "w3",
          "action" : "call",
          "method" : "createFunctions",
          "properties" : {
            "functions" : [ "abc" ]
          }
        } );
        var win = browser.getContentWindow();
        assertTrue( typeof( win.abc ) === "function" );
        assertTrue( typeof( win.abc_impl ) === "function" );
        TestUtil.scheduleResponse( function() {
          TestUtil.protocolSet( "w3", { "functionResult" : [ "abc", "result", null ] } );
        } );
        try {
          var result = win.abc();
          assertEquals( "result", result );
        } catch( e ) {
          throw "Browser function shouldn't throw an error";
        }
        browser.destroy();
      }
    ],

    testDispose :  [
      function() {
        // See Bug 327440 - Memory leak problem with Iframe in Internet Explorer
        var browser = this._createBrowser();
        assertTrue( browser.isSeeable() );
        assertFalse( browser._isLoaded );
        TestUtil.delayTest( 500 );
        TestUtil.store( browser );
      },
      function( browser ) {
        assertTrue( "slow connection?", browser._isLoaded );
        var wm = org.eclipse.swt.WidgetManager.getInstance();
        var el = browser._getTargetNode();
        var iframe = browser._iframeNode;
        assertTrue( iframe.parentNode === el );
        wm.dispose( "w6" );
        TestUtil.flush();
        if( qx.core.Variant.isSet( "qx.client", "mshtml" ) ) {
          assertEquals( "javascript:false;", browser.getSource() );
          assertFalse( browser.isDisposed() );
          assertIdentical( TestUtil.getDocument(), browser.getParent() );
          assertTrue( browser.isSeeable() );
        }
        assertTrue( wm.findWidgetById( "w6" ) == null ); /* may be undefined */
        TestUtil.delayTest( 1000 );
        TestUtil.store( browser, el, iframe );
      },
      function( browser, el, iframe ) {
        var log = [];
        browser.addEventListener( "load", function( e ) {
          log.push( e );
        }, this );
        browser._onload();
        assertEquals( 0, log.length );
        TestUtil.flush();
        assertTrue( "disposed?", browser.isDisposed() );
        assertTrue( el.innerHTML === "" );
        assertTrue( iframe.parentNode == null );
      }
    ],

    testEnabled :  [
      function() {
        var browser = this._createBrowser();
        TestUtil.delayTest( 1000 );
        TestUtil.store( browser );
      },
      function( browser ) {
        assertTrue( "slow connection?", browser._isLoaded );
        var blockerNode = browser.getBlockerNode();
        var blockerParent = browser._getBlockerParent();
        assertTrue( blockerNode.parentNode !== blockerParent );
        browser.setEnabled( false );
        assertTrue( blockerNode.parentNode === blockerParent );
        browser.setEnabled( true );
        assertTrue( blockerNode.parentNode !== blockerParent );
        browser.destroy();
      }
    ],

    testObjectToString : function() {
      var browser = this._createBrowser();
      var object = [];
      object[ 0 ] = 12;
      object[ 1 ] = false;
      object[ 2 ] = null;
      object[ 3 ] = "eclipse";
      object[ 4 ] = "double \" \" quotes";
      object[ 5 ] = [ 3.6, [ 'swt', true ] ];
      var ecpected = "[12,false,null,\"eclipse\",\"double \\\" \\\" quotes\",[3.6,[\"swt\",true]]]";
      assertEquals( ecpected, browser.objectToString( object ) );
    },

    testProgressEvent :  [
      function() {
        var browser = this._createBrowser();
        browser.setHasProgressListener( true );
        TestUtil.initRequestLog();
        browser.setSource( this.URL1 );
        browser.syncSource();
        TestUtil.delayTest( 7000 );
        TestUtil.store( browser );
      },
      function( browser ) {
        assertTrue( "slow connection?", browser._isLoaded );
        assertEquals( 1, TestUtil.getRequestsSend() );
        assertNotNull( TestUtil.getMessageObject().findNotifyOperation( "w6", "progressCompleted" ) );
        browser.destroy();
      }
    ],

    /////////////
    // helper

    _createBrowserByProtocol : function( id, parentId ) {
      rwt.protocol.MessageProcessor.processOperation( {
        "target" : id,
        "action" : "create",
        "type" : "rwt.widgets.Browser",
        "properties" : {
          "style" : [],
          "parent" : parentId
        }
      } );
      return rwt.protocol.ObjectManager.getObject( id );
    },

    _createBrowser : function() {
      var browser = new rwt.widgets.Browser();
      browser.addToDocument();
      browser.setSpace( 10, 576, 57, 529 );
      browser.setSource( this.BLANK );
      browser.syncSource();
      var wm = org.eclipse.swt.WidgetManager.getInstance();
      wm.add( browser, "w6", true );
      TestUtil.flush();
      return browser;
    }

 }

} );

}());