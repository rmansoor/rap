/*******************************************************************************
 * Copyright (c) 2009, 2012 EclipseSource and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    EclipseSource - initial API and implementation
 ******************************************************************************/
package org.eclipse.swt.internal.custom.ccombokit;

import static org.eclipse.rap.rwt.lifecycle.WidgetUtil.getId;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import java.io.IOException;
import java.util.Arrays;

import junit.framework.TestCase;

import org.eclipse.rap.rwt.graphics.Graphics;
import org.eclipse.rap.rwt.internal.protocol.ClientMessageConst;
import org.eclipse.rap.rwt.internal.protocol.ProtocolTestUtil;
import org.eclipse.rap.rwt.lifecycle.IWidgetAdapter;
import org.eclipse.rap.rwt.lifecycle.WidgetUtil;
import org.eclipse.rap.rwt.testfixture.Fixture;
import org.eclipse.rap.rwt.testfixture.Message;
import org.eclipse.rap.rwt.testfixture.Message.CreateOperation;
import org.eclipse.swt.SWT;
import org.eclipse.swt.custom.CCombo;
import org.eclipse.swt.events.ModifyEvent;
import org.eclipse.swt.events.ModifyListener;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.events.SelectionListener;
import org.eclipse.swt.events.VerifyEvent;
import org.eclipse.swt.events.VerifyListener;
import org.eclipse.swt.graphics.Color;
import org.eclipse.swt.graphics.Font;
import org.eclipse.swt.graphics.Point;
import org.eclipse.swt.internal.widgets.Props;
import org.eclipse.swt.internal.widgets.controlkit.ControlLCATestUtil;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Combo;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Shell;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.mockito.ArgumentCaptor;


public class CComboLCA_Test extends TestCase {

  private static final String PROP_ITEMS = "items";
  private static final String PROP_SELECTION_INDEX = "selectionIndex";

  private Display display;
  private Shell shell;
  private CCombo ccombo;
  private CComboLCA lca;

  @Override
  protected void setUp() throws Exception {
    Fixture.setUp();
    display = new Display();
    shell = new Shell( display, SWT.NONE );
    ccombo = new CCombo( shell, SWT.NONE );
    lca = new CComboLCA();
    Fixture.fakeNewRequest( display );
  }

  @Override
  protected void tearDown() throws Exception {
    Fixture.tearDown();
  }

  public void testControlListeners() throws IOException {
    ControlLCATestUtil.testActivateListener( ccombo );
    ControlLCATestUtil.testFocusListener( ccombo );
    ControlLCATestUtil.testMouseListener( ccombo );
    ControlLCATestUtil.testKeyListener( ccombo );
    ControlLCATestUtil.testTraverseListener( ccombo );
    ControlLCATestUtil.testMenuDetectListener( ccombo );
    ControlLCATestUtil.testHelpListener( ccombo );
  }

  public void testPreserveValues() {
    CCombo ccombo = new CCombo( shell, SWT.READ_ONLY );
    Fixture.markInitialized( display );
    // Test preserving a CCombo with no items and (naturally) no selection
    Fixture.preserveWidgets();
    IWidgetAdapter adapter = WidgetUtil.getAdapter( ccombo );
    String[] items = ( ( String[] )adapter.getPreserved( PROP_ITEMS ) );
    assertEquals( 0, items.length );
    assertEquals( new Integer( -1 ), adapter.getPreserved( PROP_SELECTION_INDEX ) );
    Object visibleItemCount = adapter.getPreserved( CComboLCA.PROP_VISIBLE_ITEM_COUNT );
    assertEquals( new Integer( ccombo.getVisibleItemCount() ), visibleItemCount );
    assertNull( adapter.getPreserved( CComboLCA.PROP_TEXT_LIMIT ) );
    assertEquals( new Point( 0, 0 ), adapter.getPreserved( CComboLCA.PROP_SELECTION ) );
    assertEquals( Boolean.FALSE, adapter.getPreserved( CComboLCA.PROP_LIST_VISIBLE ) );
    assertEquals( Boolean.FALSE, adapter.getPreserved( CComboLCA.PROP_EDITABLE ) );
    // Test preserving CCombo with items, where one is selected
    Fixture.clearPreserved();
    ccombo.add( "item 1" );
    ccombo.add( "item 2" );
    ccombo.select( 1 );
    ccombo.setTextLimit( 10 );
    ccombo.setListVisible( true );
    SelectionListener selectionListener = new SelectionAdapter() {
    };
    ccombo.addSelectionListener( selectionListener );
    ccombo.addModifyListener( new ModifyListener() {
      public void modifyText( ModifyEvent event ) {
      }
    } );
    Fixture.preserveWidgets();
    adapter = WidgetUtil.getAdapter( ccombo );
    items = ( ( String[] )adapter.getPreserved( PROP_ITEMS ) );
    assertEquals( 2, items.length );
    assertEquals( "item 1", items[ 0 ] );
    assertEquals( "item 2", items[ 1 ] );
    assertEquals( new Integer( 1 ), adapter.getPreserved( PROP_SELECTION_INDEX ) );
    visibleItemCount = adapter.getPreserved( CComboLCA.PROP_VISIBLE_ITEM_COUNT );
    assertEquals( new Integer( ccombo.getVisibleItemCount() ), visibleItemCount );
    assertEquals( "item 2", adapter.getPreserved( Props.TEXT ) );
    assertEquals( new Integer( 10 ), adapter.getPreserved( CComboLCA.PROP_TEXT_LIMIT ) );
    assertEquals( Boolean.TRUE, adapter.getPreserved( CComboLCA.PROP_LIST_VISIBLE ) );
    assertEquals( Boolean.FALSE, adapter.getPreserved( CComboLCA.PROP_EDITABLE ) );
    Fixture.clearPreserved();
    // foreground background font
    Color background = Graphics.getColor( 122, 33, 203 );
    ccombo.setBackground( background );
    Color foreground = Graphics.getColor( 211, 178, 211 );
    ccombo.setForeground( foreground );
    Font font = Graphics.getFont( "font", 12, SWT.BOLD );
    ccombo.setFont( font );
    Fixture.preserveWidgets();
    adapter = WidgetUtil.getAdapter( ccombo );
    assertEquals( background, adapter.getPreserved( Props.BACKGROUND ) );
    assertEquals( foreground, adapter.getPreserved( Props.FOREGROUND ) );
    assertEquals( font, adapter.getPreserved( Props.FONT ) );
    Fixture.clearPreserved();
    // tooltiptext
    Fixture.preserveWidgets();
    adapter = WidgetUtil.getAdapter( ccombo );
    assertEquals( null, ccombo.getToolTipText() );
    Fixture.clearPreserved();
    ccombo.setToolTipText( "some text" );
    Fixture.preserveWidgets();
    adapter = WidgetUtil.getAdapter( ccombo );
    assertEquals( "some text", ccombo.getToolTipText() );
    Fixture.clearPreserved();
  }

  public void testEditablePreserveValues() {
    Fixture.markInitialized( display );
    Fixture.preserveWidgets();
    IWidgetAdapter adapter = WidgetUtil.getAdapter( ccombo );
    assertEquals( Boolean.TRUE, adapter.getPreserved( CComboLCA.PROP_EDITABLE ) );
  }

  public void testReadData_ListVisible() {
    ccombo.add( "item 1" );
    ccombo.add( "item 2" );

    Fixture.fakeSetParameter( getId( ccombo ), "listVisible", Boolean.TRUE );
    lca.readData( ccombo );

    assertEquals( true, ccombo.getListVisible() );
  }

  public void testReadData_SelectedItem() {
    ccombo.add( "item 1" );
    ccombo.add( "item 2" );

    Fixture.fakeSetParameter( getId( ccombo ), "selectionIndex", Integer.valueOf( 1 ) );
    lca.readData( ccombo );

    assertEquals( 1, ccombo.getSelectionIndex() );
  }

  public void testFireSelectionEvent() {
    SelectionListener listener = mock( SelectionListener.class );
    ccombo.addSelectionListener( listener );

    Fixture.fakeNotifyOperation( getId( ccombo ), ClientMessageConst.EVENT_SELECTION, null );
    Fixture.readDataAndProcessAction( ccombo );

    verify( listener, times( 1 ) ).widgetSelected( any( SelectionEvent.class ) );
  }

  public void testReadData_Text() {
    Fixture.fakeSetParameter( getId( ccombo ), "text", "abc" );

    lca.readData( ccombo );

    assertEquals( "abc", ccombo.getText() );
  }

  public void testReadData_TextAndSelection() {
    Fixture.fakeSetParameter( getId( ccombo ), "text", "abc" );
    Fixture.fakeSetParameter( getId( ccombo ), "selectionStart", Integer.valueOf( 1 ) );
    Fixture.fakeSetParameter( getId( ccombo ), "selectionLength", Integer.valueOf( 1 ) );

    lca.readData( ccombo );

    assertEquals( new Point( 1, 2 ), ccombo.getSelection() );
  }

  public void testTextIsNotRenderdBack() {
    Fixture.markInitialized( display );
    Fixture.markInitialized( shell );
    Fixture.markInitialized( ccombo );

    Fixture.fakeSetParameter( getId( ccombo ), "text", "some text" );
    Fixture.executeLifeCycleFromServerThread();

    // ensure that no text is sent back to the client
    Message message = Fixture.getProtocolMessage();
    assertNull( message.findSetOperation( ccombo, "text" ) );
    assertEquals( "some text", ccombo.getText() );
  }

  public void testReadText_WithVerifyListener() {
    Fixture.markInitialized( display );
    Fixture.markInitialized( shell );
    Fixture.markInitialized( ccombo );
    ccombo.setText( "some text" );
    VerifyListener listener = mock( VerifyListener.class );
    ccombo.addVerifyListener( listener );

    Fixture.fakeSetParameter( getId( ccombo ), "text", "verify me" );
    Fixture.executeLifeCycleFromServerThread();

    assertEquals( "verify me", ccombo.getText() );
    ArgumentCaptor<VerifyEvent> captor = ArgumentCaptor.forClass( VerifyEvent.class );
    verify( listener, times( 1 ) ).verifyText( captor.capture() );
    VerifyEvent event = captor.getValue();
    assertEquals( "verify me", event.text );
    assertEquals( 0, event.start );
    assertEquals( 9, event.end );
  }

  public void testTextSelectionWithVerifyEvent_EmptyListener() {
    Fixture.markInitialized( display );
    Fixture.markInitialized( shell );
    Fixture.markInitialized( ccombo );
    VerifyListener listener = mock( VerifyListener.class );
    ccombo.addVerifyListener( listener );

    fakeTextAndSelectionParameters( "verify me", 1, 0 );
    Fixture.executeLifeCycleFromServerThread();

    verify( listener, times( 1 ) ).verifyText( any( VerifyEvent.class ) );
    assertEquals( "verify me", ccombo.getText() );
    assertEquals( new Point( 1, 1 ), ccombo.getSelection() );
    Message message = Fixture.getProtocolMessage();
    assertNull( message.findSetOperation( ccombo, "text" ) );
    assertNull( message.findSetOperation( ccombo, "selection" ) );
  }

  public void testTextSelectionWithVerifyEvent_ListenerDoesNotChangeSelection() {
    ccombo.setText( "" );
    ccombo.addVerifyListener( new VerifyListener() {
      public void verifyText( VerifyEvent event ) {
        event.text = "verified";
      }
    } );

    fakeTextAndSelectionParameters( "verify me", 1, 0 );
    Fixture.executeLifeCycleFromServerThread( );

    assertEquals( new Point( 1, 1 ), ccombo.getSelection() );
    assertEquals( "verified", ccombo.getText() );
  }

  public void testTextSelectionWithVerifyEvent_ListenerAdjustsSelection() {
    ccombo.setText( "" );
    ccombo.addVerifyListener( new VerifyListener() {
      public void verifyText( VerifyEvent event ) {
        event.text = "";
      }
    } );

    fakeTextAndSelectionParameters( "verify me", 1, 0 );
    Fixture.executeLifeCycleFromServerThread( );

    assertEquals( new Point( 0, 0 ), ccombo.getSelection() );
    assertEquals( "", ccombo.getText() );
  }

  public void testSelectionAfterRemoveAll() {
    ccombo = new CCombo( shell, SWT.READ_ONLY );
    Fixture.markInitialized( display );
    Fixture.markInitialized( ccombo );
    ccombo.add( "item 1" );
    ccombo.select( 0 );
    Button button = new Button( shell, SWT.PUSH );
    button.addSelectionListener( new SelectionAdapter() {
      @Override
      public void widgetSelected( SelectionEvent e ) {
        ccombo.removeAll();
        ccombo.add( "replacement for item 1" );
        ccombo.select( 0 );
      }
    } );

    // Simulate button click that executes widgetSelected
    Fixture.fakeNotifyOperation( getId( button ), ClientMessageConst.EVENT_SELECTION, null );
    Fixture.executeLifeCycleFromServerThread();

    Message message = Fixture.getProtocolMessage();
    assertEquals( new Integer( 0 ), message.findSetProperty( ccombo, PROP_SELECTION_INDEX ) );
  }

  public void testRenderCreate() throws IOException {
    lca.renderInitialization( ccombo );

    Message message = Fixture.getProtocolMessage();
    CreateOperation operation = message.findCreateOperation( ccombo );
    assertEquals( "rwt.widgets.Combo", operation.getType() );
    assertEquals( Boolean.TRUE, operation.getProperty( "ccombo" ) );
  }

  public void testRenderParent() throws IOException {
    lca.renderInitialization( ccombo );

    Message message = Fixture.getProtocolMessage();
    CreateOperation operation = message.findCreateOperation( ccombo );
    assertEquals( WidgetUtil.getId( ccombo.getParent() ), operation.getParent() );
  }


  public void testRenderFlatStyle() throws IOException {
    CCombo ccombo = new CCombo( shell, SWT.FLAT );

    lca.renderInitialization( ccombo );

    Message message = Fixture.getProtocolMessage();
    CreateOperation operation = message.findCreateOperation( ccombo );
    Object[] styles = operation.getStyles();
    assertTrue( Arrays.asList( styles ).contains( "FLAT" ) );
  }
  public void testRenderInitialItemHeight() throws IOException {
    lca.render( ccombo );

    Message message = Fixture.getProtocolMessage();
    CreateOperation operation = message.findCreateOperation( ccombo );
    assertTrue( operation.getPropertyNames().contains( "itemHeight" ) );
  }

  public void testRenderItemHeight() throws IOException {
    ccombo.setFont( Graphics.getFont( "Arial", 16, SWT.NONE ) );
    lca.renderChanges( ccombo );

    Message message = Fixture.getProtocolMessage();
    assertEquals( new Integer( 22 ), message.findSetProperty( ccombo, "itemHeight" ) );
  }

  public void testRenderItemHeightUnchanged() throws IOException {
    Fixture.markInitialized( display );
    Fixture.markInitialized( ccombo );

    ccombo.setFont( Graphics.getFont( "Arial", 16, SWT.NONE ) );
    Fixture.preserveWidgets();
    lca.renderChanges( ccombo );

    Message message = Fixture.getProtocolMessage();
    assertNull( message.findSetOperation( ccombo, "itemHeight" ) );
  }

  public void testRenderInitialVisibleItemCount() throws IOException {
    lca.render( ccombo );

    Message message = Fixture.getProtocolMessage();
    CreateOperation operation = message.findCreateOperation( ccombo );
    assertTrue( operation.getPropertyNames().indexOf( "visibleItemCount" ) == -1 );
  }

  public void testRenderVisibleItemCount() throws IOException {
    ccombo.setVisibleItemCount( 10 );
    lca.renderChanges( ccombo );

    Message message = Fixture.getProtocolMessage();
    assertEquals( new Integer( 10 ), message.findSetProperty( ccombo, "visibleItemCount" ) );
  }

  public void testRenderVisibleItemCountUnchanged() throws IOException {
    Fixture.markInitialized( display );
    Fixture.markInitialized( ccombo );

    ccombo.setVisibleItemCount( 10 );
    Fixture.preserveWidgets();
    lca.renderChanges( ccombo );

    Message message = Fixture.getProtocolMessage();
    assertNull( message.findSetOperation( ccombo, "visibleItemCount" ) );
  }

  public void testRenderInitialItems() throws IOException {
    lca.render( ccombo );

    Message message = Fixture.getProtocolMessage();
    CreateOperation operation = message.findCreateOperation( ccombo );
    assertTrue( operation.getPropertyNames().indexOf( "items" ) == -1 );
  }

  public void testRenderItems() throws IOException, JSONException {
    ccombo.setItems( new String[] { "a", "b", "c" } );
    lca.renderChanges( ccombo );

    Message message = Fixture.getProtocolMessage();
    String expected = "[ \"a\", \"b\", \"c\" ]";
    JSONArray actual = ( JSONArray )message.findSetProperty( ccombo, "items" );
    assertTrue( ProtocolTestUtil.jsonEquals( expected, actual ) );
  }

  public void testRenderItemsUnchanged() throws IOException {
    Fixture.markInitialized( display );
    Fixture.markInitialized( ccombo );

    ccombo.setItems( new String[] { "a", "b", "c" } );
    Fixture.preserveWidgets();
    lca.renderChanges( ccombo );

    Message message = Fixture.getProtocolMessage();
    assertNull( message.findSetOperation( ccombo, "items" ) );
  }

  public void testRenderInitialListVisible() throws IOException {
    lca.render( ccombo );

    Message message = Fixture.getProtocolMessage();
    CreateOperation operation = message.findCreateOperation( ccombo );
    assertTrue( operation.getPropertyNames().indexOf( "listVisible" ) == -1 );
  }

  public void testRenderListVisible() throws IOException {
    ccombo.setListVisible( true );
    lca.renderChanges( ccombo );

    Message message = Fixture.getProtocolMessage();
    assertEquals( Boolean.TRUE, message.findSetProperty( ccombo, "listVisible" ) );
  }

  public void testRenderListVisibleUnchanged() throws IOException {
    Fixture.markInitialized( display );
    Fixture.markInitialized( ccombo );

    ccombo.setListVisible( true );
    Fixture.preserveWidgets();
    lca.renderChanges( ccombo );

    Message message = Fixture.getProtocolMessage();
    assertNull( message.findSetOperation( ccombo, "listVisible" ) );
  }

  public void testRenderInitialSelectionIndex() throws IOException {
    lca.render( ccombo );

    Message message = Fixture.getProtocolMessage();
    CreateOperation operation = message.findCreateOperation( ccombo );
    assertTrue( operation.getPropertyNames().indexOf( "selectionIndex" ) == -1 );
  }

  public void testRenderSelectionIndex() throws IOException {
    ccombo.setItems( new String[] { "a", "b", "c" } );

    ccombo.select( 1 );
    lca.renderChanges( ccombo );

    Message message = Fixture.getProtocolMessage();
    assertEquals( new Integer( 1 ), message.findSetProperty( ccombo, "selectionIndex" ) );
  }

  public void testRenderSelectionIndexUnchanged() throws IOException {
    ccombo.setItems( new String[] { "a", "b", "c" } );
    Fixture.markInitialized( display );
    Fixture.markInitialized( ccombo );

    ccombo.select( 1 );
    Fixture.preserveWidgets();
    lca.renderChanges( ccombo );

    Message message = Fixture.getProtocolMessage();
    assertNull( message.findSetOperation( ccombo, "selectionIndex" ) );
  }

  public void testRenderInitialEditable() throws IOException {
    lca.render( ccombo );

    Message message = Fixture.getProtocolMessage();
    CreateOperation operation = message.findCreateOperation( ccombo );
    assertTrue( operation.getPropertyNames().indexOf( "editable" ) == -1 );
  }

  public void testRenderEditable() throws IOException {
    ccombo.setEditable( false );
    lca.renderChanges( ccombo );

    Message message = Fixture.getProtocolMessage();
    assertEquals( Boolean.FALSE, message.findSetProperty( ccombo, "editable" ) );
  }

  public void testRenderEditableUnchanged() throws IOException {
    Fixture.markInitialized( display );
    Fixture.markInitialized( ccombo );

    ccombo.setEditable( false );
    Fixture.preserveWidgets();
    lca.renderChanges( ccombo );

    Message message = Fixture.getProtocolMessage();
    assertNull( message.findSetOperation( ccombo, "editable" ) );
  }

  public void testRenderInitialText() throws IOException {
    lca.render( ccombo );

    Message message = Fixture.getProtocolMessage();
    CreateOperation operation = message.findCreateOperation( ccombo );
    assertTrue( operation.getPropertyNames().indexOf( "text" ) == -1 );
  }

  public void testRenderText() throws IOException {
    ccombo.setText( "foo" );
    lca.renderChanges( ccombo );

    Message message = Fixture.getProtocolMessage();
    assertEquals( "foo", message.findSetProperty( ccombo, "text" ) );
  }

  public void testRenderTextReadOnly() throws IOException {
    CCombo ccombo = new CCombo( shell, SWT.READ_ONLY );

    ccombo.setText( "foo" );
    lca.renderChanges( ccombo );

    Message message = Fixture.getProtocolMessage();
    assertEquals( "foo", message.findSetProperty( ccombo, "text" ) );
  }

  public void testRenderTextNotEditable() throws IOException {
    ccombo.setEditable( false );

    ccombo.setText( "foo" );
    lca.renderChanges( ccombo );

    Message message = Fixture.getProtocolMessage();
    assertEquals( "foo", message.findSetProperty( ccombo, "text" ) );
  }

  public void testRenderTextUnchanged() throws IOException {
    Fixture.markInitialized( display );
    Fixture.markInitialized( ccombo );

    ccombo.setText( "foo" );
    Fixture.preserveWidgets();
    lca.renderChanges( ccombo );

    Message message = Fixture.getProtocolMessage();
    assertNull( message.findSetOperation( ccombo, "text" ) );
  }

  public void testRenderInitialSelection() throws IOException {
    lca.render( ccombo );

    Message message = Fixture.getProtocolMessage();
    CreateOperation operation = message.findCreateOperation( ccombo );
    assertTrue( operation.getPropertyNames().indexOf( "selection" ) == -1 );
  }

  public void testRenderSelection() throws IOException, JSONException {
    ccombo.setText( "foo bar" );

    ccombo.setSelection( new Point( 1, 3 ) );
    lca.renderChanges( ccombo );

    Message message = Fixture.getProtocolMessage();
    JSONArray actual = ( JSONArray )message.findSetProperty( ccombo, "selection" );
    assertTrue( ProtocolTestUtil.jsonEquals( "[ 1, 3 ]", actual ) );
  }

  public void testRenderSelectionUnchanged() throws IOException {
    ccombo.setText( "foo bar" );
    Fixture.markInitialized( display );
    Fixture.markInitialized( ccombo );

    ccombo.setSelection( new Point( 1, 3 ) );
    Fixture.preserveWidgets();
    lca.renderChanges( ccombo );

    Message message = Fixture.getProtocolMessage();
    assertNull( message.findSetOperation( ccombo, "selection" ) );
  }

  public void testRenderInitialTextLimit() throws IOException {
    lca.render( ccombo );

    Message message = Fixture.getProtocolMessage();
    CreateOperation operation = message.findCreateOperation( ccombo );
    assertTrue( operation.getPropertyNames().indexOf( "textLimit" ) == -1 );
  }

  public void testRenderTextLimit() throws IOException {
    ccombo.setTextLimit( 10 );
    lca.renderChanges( ccombo );

    Message message = Fixture.getProtocolMessage();
    assertEquals( new Integer( 10 ), message.findSetProperty( ccombo, "textLimit" ) );
  }

  public void testRenderTextLimitNoLimit() throws IOException {
    Fixture.markInitialized( display );
    Fixture.markInitialized( ccombo );
    ccombo.setTextLimit( 10 );
    Fixture.preserveWidgets();

    ccombo.setTextLimit( Combo.LIMIT );
    lca.renderChanges( ccombo );

    Message message = Fixture.getProtocolMessage();
    assertEquals( JSONObject.NULL, message.findSetProperty( ccombo, "textLimit" ) );
  }

  public void testRenderTextLimitUnchanged() throws IOException {
    Fixture.markInitialized( display );
    Fixture.markInitialized( ccombo );

    ccombo.setTextLimit( 10 );
    Fixture.preserveWidgets();
    lca.renderChanges( ccombo );

    Message message = Fixture.getProtocolMessage();
    assertNull( message.findSetOperation( ccombo, "textLimit" ) );
  }

  public void testRenderTextLimitReset() throws IOException {
    Fixture.markInitialized( display );
    Fixture.markInitialized( ccombo );

    ccombo.setTextLimit( 10 );
    Fixture.preserveWidgets();
    ccombo.setTextLimit( CCombo.LIMIT );
    lca.renderChanges( ccombo );

    Message message = Fixture.getProtocolMessage();
    assertEquals( JSONObject.NULL, message.findSetProperty( ccombo, "textLimit" ) );
  }

  public void testRenderTextLimitResetWithNegative() throws IOException {
    Fixture.markInitialized( display );
    Fixture.markInitialized( ccombo );

    ccombo.setTextLimit( 10 );
    Fixture.preserveWidgets();
    ccombo.setTextLimit( -5 );
    lca.renderChanges( ccombo );

    Message message = Fixture.getProtocolMessage();
    assertEquals( JSONObject.NULL, message.findSetProperty( ccombo, "textLimit" ) );
  }

  public void testRenderAddSelectionListener() throws Exception {
    Fixture.markInitialized( display );
    Fixture.markInitialized( ccombo );
    Fixture.preserveWidgets();

    ccombo.addSelectionListener( new SelectionAdapter() { } );
    lca.renderChanges( ccombo );

    Message message = Fixture.getProtocolMessage();
    assertEquals( Boolean.TRUE, message.findListenProperty( ccombo, "Selection" ) );
    assertEquals( Boolean.TRUE, message.findListenProperty( ccombo, "DefaultSelection" ) );
  }

  public void testRenderRemoveSelectionListener() throws Exception {
    SelectionListener listener = new SelectionAdapter() { };
    ccombo.addSelectionListener( listener );
    Fixture.markInitialized( display );
    Fixture.markInitialized( ccombo );
    Fixture.preserveWidgets();

    ccombo.removeSelectionListener( listener );
    lca.renderChanges( ccombo );

    Message message = Fixture.getProtocolMessage();
    assertEquals( Boolean.FALSE, message.findListenProperty( ccombo, "Selection" ) );
    assertEquals( Boolean.FALSE, message.findListenProperty( ccombo, "DefaultSelection" ) );
  }

  public void testRenderSelectionListenerUnchanged() throws Exception {
    Fixture.markInitialized( display );
    Fixture.markInitialized( ccombo );
    Fixture.preserveWidgets();

    ccombo.addSelectionListener( new SelectionAdapter() { } );
    Fixture.preserveWidgets();
    lca.renderChanges( ccombo );

    Message message = Fixture.getProtocolMessage();
    assertNull( message.findListenOperation( ccombo, "selection" ) );
  }

  public void testRenderAddModifyListener() throws Exception {
    Fixture.markInitialized( display );
    Fixture.markInitialized( ccombo );
    Fixture.preserveWidgets();

    ccombo.addModifyListener( new ModifyListener() {
      public void modifyText( ModifyEvent event ) {
      }
    } );
    lca.renderChanges( ccombo );

    Message message = Fixture.getProtocolMessage();
    assertEquals( Boolean.TRUE, message.findListenProperty( ccombo, "modify" ) );
  }

  public void testRenderRemoveModifyListener() throws Exception {
    ModifyListener listener = new ModifyListener() {
      public void modifyText( ModifyEvent event ) {
      }
    };
    ccombo.addModifyListener( listener );
    Fixture.markInitialized( display );
    Fixture.markInitialized( ccombo );
    Fixture.preserveWidgets();

    ccombo.removeModifyListener( listener );
    lca.renderChanges( ccombo );

    Message message = Fixture.getProtocolMessage();
    assertEquals( Boolean.FALSE, message.findListenProperty( ccombo, "modify" ) );
  }

  public void testRenderModifyListenerUnchanged() throws Exception {
    Fixture.markInitialized( display );
    Fixture.markInitialized( ccombo );
    Fixture.preserveWidgets();

    ccombo.addModifyListener( new ModifyListener() {
      public void modifyText( ModifyEvent event ) {
      }
    } );
    Fixture.preserveWidgets();
    lca.renderChanges( ccombo );

    Message message = Fixture.getProtocolMessage();
    assertNull( message.findListenOperation( ccombo, "modify" ) );
  }

  public void testRenderAddVerifyListener() throws Exception {
    Fixture.markInitialized( display );
    Fixture.markInitialized( ccombo );
    Fixture.preserveWidgets();

    ccombo.addVerifyListener( new VerifyListener() {
      public void verifyText( VerifyEvent event ) {
      }
    } );
    lca.renderChanges( ccombo );

    Message message = Fixture.getProtocolMessage();
    assertEquals( Boolean.TRUE, message.findListenProperty( ccombo, "verify" ) );
  }

  public void testRenderRemoveVerifyListener() throws Exception {
    VerifyListener listener = new VerifyListener() {
      public void verifyText( VerifyEvent event ) {
      }
    };
    ccombo.addVerifyListener( listener );
    Fixture.markInitialized( display );
    Fixture.markInitialized( ccombo );
    Fixture.preserveWidgets();

    ccombo.removeVerifyListener( listener );
    lca.renderChanges( ccombo );

    Message message = Fixture.getProtocolMessage();
    assertEquals( Boolean.FALSE, message.findListenProperty( ccombo, "verify" ) );
  }

  public void testRenderVerifyListenerUnchanged() throws Exception {
    Fixture.markInitialized( display );
    Fixture.markInitialized( ccombo );
    Fixture.preserveWidgets();

    ccombo.addVerifyListener( new VerifyListener() {
      public void verifyText( VerifyEvent event ) {
      }
    } );
    Fixture.preserveWidgets();
    lca.renderChanges( ccombo );

    Message message = Fixture.getProtocolMessage();
    assertNull( message.findListenOperation( ccombo, "verify" ) );
  }

  private void fakeTextAndSelectionParameters( String text, int start, int length ) {
    Fixture.fakeSetParameter( getId( ccombo ), "text", text );
    Fixture.fakeSetParameter( getId( ccombo ), "selectionStart", Integer.valueOf( start ) );
    Fixture.fakeSetParameter( getId( ccombo ), "selectionLength", Integer.valueOf( length ) );
  }
}
