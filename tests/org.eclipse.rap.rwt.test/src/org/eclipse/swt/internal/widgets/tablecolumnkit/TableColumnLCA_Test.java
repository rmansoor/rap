/*******************************************************************************
 * Copyright (c) 2007, 2015 Innoopract Informationssysteme GmbH and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    Innoopract Informationssysteme GmbH - initial API and implementation
 *    EclipseSource - ongoing development
 ******************************************************************************/
package org.eclipse.swt.internal.widgets.tablecolumnkit;

import static org.eclipse.rap.rwt.internal.lifecycle.WidgetUtil.getId;
import static org.eclipse.rap.rwt.internal.lifecycle.WidgetUtil.registerDataKeys;
import static org.eclipse.rap.rwt.internal.protocol.RemoteObjectFactory.getRemoteObject;
import static org.eclipse.rap.rwt.testfixture.internal.Fixture.getProtocolMessage;
import static org.eclipse.rap.rwt.testfixture.internal.TestMessage.getParent;
import static org.eclipse.rap.rwt.testfixture.internal.TestUtil.createImage;
import static org.eclipse.swt.internal.widgets.tablecolumnkit.TableColumnLCA.getLeft;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertSame;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.mock;

import java.io.IOException;

import org.eclipse.rap.json.JsonArray;
import org.eclipse.rap.json.JsonObject;
import org.eclipse.rap.json.JsonValue;
import org.eclipse.rap.rwt.RWT;
import org.eclipse.rap.rwt.internal.lifecycle.PhaseId;
import org.eclipse.rap.rwt.internal.lifecycle.RemoteAdapter;
import org.eclipse.rap.rwt.internal.lifecycle.WidgetUtil;
import org.eclipse.rap.rwt.internal.protocol.Operation.CreateOperation;
import org.eclipse.rap.rwt.internal.remote.RemoteObjectRegistry;
import org.eclipse.rap.rwt.remote.OperationHandler;
import org.eclipse.rap.rwt.testfixture.internal.Fixture;
import org.eclipse.rap.rwt.testfixture.internal.TestMessage;
import org.eclipse.swt.SWT;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionListener;
import org.eclipse.swt.graphics.Font;
import org.eclipse.swt.graphics.Image;
import org.eclipse.swt.internal.graphics.ImageFactory;
import org.eclipse.swt.internal.widgets.Props;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Listener;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.swt.widgets.Table;
import org.eclipse.swt.widgets.TableColumn;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;


public class TableColumnLCA_Test {

  private Display display;
  private Shell shell;
  private Table table;
  private TableColumn column;
  private TableColumnLCA lca;

  @Before
  public void setUp() {
    Fixture.setUp();
    display = new Display();
    shell = new Shell( display );
    table = new Table( shell, SWT.NONE );
    column = new TableColumn( table, SWT.NONE );
    lca = TableColumnLCA.INSTANCE;
    Fixture.fakeNewRequest();
    Fixture.fakePhase( PhaseId.PROCESS_ACTION );
  }

  @After
  public void tearDown() {
    Fixture.tearDown();
  }

  @Test
  public void testPreserveValus() throws IOException {
    table = new Table( shell, SWT.BORDER );
    column = new TableColumn( table, SWT.CENTER );
    Fixture.markInitialized( display );
    //text
    Fixture.preserveWidgets();
    RemoteAdapter adapter = WidgetUtil.getAdapter( column );
    assertEquals( "", adapter.getPreserved( Props.TEXT ) );
    Fixture.clearPreserved();
    column.setText( "some text" );
    Fixture.preserveWidgets();
    adapter = WidgetUtil.getAdapter( column );
    assertEquals( "some text", adapter.getPreserved( Props.TEXT ) );
    Fixture.clearPreserved();
    //image
    Fixture.preserveWidgets();
    adapter = WidgetUtil.getAdapter( column );
    assertEquals( null, adapter.getPreserved( Props.IMAGE ) );
    Fixture.clearPreserved();
    Image image = createImage( display, Fixture.IMAGE1 );
    column.setImage( image );
    Fixture.preserveWidgets();
    adapter = WidgetUtil.getAdapter( column );
    assertSame( image, adapter.getPreserved( Props.IMAGE ) );
    Fixture.clearPreserved();
    //tooltiptext
    Fixture.preserveWidgets();
    adapter = WidgetUtil.getAdapter( column );
    assertEquals( null, column.getToolTipText() );
    Fixture.clearPreserved();
    column.setToolTipText( "some text" );
    Fixture.preserveWidgets();
    adapter = WidgetUtil.getAdapter( column );
    assertEquals( "some text", column.getToolTipText() );
    Fixture.clearPreserved();
    // left,sortimage,resizable,moveable,selection_listeners,width
    Fixture.preserveWidgets();
    adapter = WidgetUtil.getAdapter( column );
    Object left = adapter.getPreserved( TableColumnLCA.PROP_LEFT );
    assertEquals( new Integer( getLeft( column ) ), left );
    Object resizable = adapter.getPreserved( TableColumnLCA.PROP_RESIZABLE );
    assertEquals( Boolean.TRUE, resizable );
    Object moveable = adapter.getPreserved( TableColumnLCA.PROP_MOVEABLE );
    assertEquals( Boolean.FALSE, moveable );
    Fixture.clearPreserved();
    column.setMoveable( true );
    column.setResizable( false );
    column.setWidth( 30 );
    SelectionListener selectionListener = new SelectionAdapter() {
    };
    column.addSelectionListener( selectionListener );
    Fixture.preserveWidgets();
    adapter = WidgetUtil.getAdapter( column );
    left = adapter.getPreserved( TableColumnLCA.PROP_LEFT );
    assertEquals( new Integer( getLeft( column ) ), left );
    resizable = adapter.getPreserved( TableColumnLCA.PROP_RESIZABLE );
    assertEquals( Boolean.FALSE, resizable );
    moveable = adapter.getPreserved( TableColumnLCA.PROP_MOVEABLE );
    assertEquals( Boolean.TRUE, moveable );
    Object width = adapter.getPreserved( TableColumnLCA.PROP_WIDTH );
    assertEquals( new Integer( 30 ), width );
  }

  @Test
  public void testGetLeft() {
    column.setWidth( 10 );
    TableColumn column1 = new TableColumn( table, SWT.NONE );
    column1.setWidth( 10 );
    TableColumn column2 = new TableColumn( table, SWT.NONE );
    column2.setWidth( 10 );
    // Test with natural column order
    assertEquals( 0, getLeft( column ) );
    assertEquals( 10, getLeft( column1 ) );
    assertEquals( 20, getLeft( column2 ) );
    // Test with reverted column order
    table.setColumnOrder( new int[]{
      2, 1, 0
    } );
    assertEquals( 0, getLeft( column2 ) );
    assertEquals( 10, getLeft( column1 ) );
    assertEquals( 20, getLeft( column ) );
  }


  // see bug 336340
  @Test
  public void testMoveColumn_ZeroWidth() {
    column.dispose();
    Fixture.markInitialized( display );
    Fixture.markInitialized( table );
    for( int i = 1; i < 5; i++ ) {
      TableColumn column = new TableColumn( table, SWT.NONE );
      Fixture.markInitialized( column );
      column.setWidth( i * 10 );
    }
    table.getColumn( 2 ).setWidth( 0 );

    TableColumn column1 = table.getColumn( 1 );
    getRemoteObject( column1 ).setHandler( new TableColumnOperationHandler( column1 ) );
    JsonObject parameters = new JsonObject().add( "left", 35 );
    Fixture.fakeCallOperation( getId( column1 ), "move", parameters  );
    Fixture.executeLifeCycleFromServerThread( );

    TestMessage message = Fixture.getProtocolMessage();
    assertEquals( 10, message.findSetProperty( column1, "left" ).asInt() );
  }

  @Test
  public void testRenderCreate() throws IOException {
    lca.renderInitialization( column );

    TestMessage message = Fixture.getProtocolMessage();
    CreateOperation operation = message.findCreateOperation( column );
    assertEquals( "rwt.widgets.GridColumn", operation.getType() );
  }

  @Test
  public void testRenderCreateWithAligment() throws IOException {
    column = new TableColumn( table, SWT.RIGHT );

    lca.render( column );

    TestMessage message = Fixture.getProtocolMessage();
    CreateOperation operation = message.findCreateOperation( column );
    assertFalse( operation.getProperties().names().contains( "style" ) );
    assertEquals( "right", message.findCreateProperty( column, "alignment" ).asString() );
  }

  @Test
  public void testRenderCreate_setsOperationHandler() throws IOException {
    String id = getId( column );

    lca.renderInitialization( column );

    OperationHandler handler = RemoteObjectRegistry.getInstance().get( id ).getHandler();
    assertTrue( handler instanceof TableColumnOperationHandler );
  }

  @Test
  public void testRenderParent() throws IOException {
    lca.renderInitialization( column );

    TestMessage message = Fixture.getProtocolMessage();
    CreateOperation operation = message.findCreateOperation( column );
    assertEquals( getId( column.getParent() ), getParent( operation ) );
  }

  @Test
  public void testRenderInitialIndex() throws IOException {
    lca.render( column );

    TestMessage message = Fixture.getProtocolMessage();
    assertEquals( 0, message.findCreateProperty( column, "index" ).asInt() );
  }

  @Test
  public void testRenderIndex() throws IOException {
    new TableColumn( table, SWT.NONE, 0 );
    lca.renderChanges( column );

    TestMessage message = Fixture.getProtocolMessage();
    assertEquals( 1, message.findSetProperty( column, "index" ).asInt() );
  }

  @Test
  public void testRenderIndexUnchanged() throws IOException {
    Fixture.markInitialized( display );
    Fixture.markInitialized( column );

    new TableColumn( table, SWT.NONE, 0 );
    Fixture.preserveWidgets();
    lca.renderChanges( column );

    TestMessage message = Fixture.getProtocolMessage();
    assertNull( message.findSetOperation( column, "index" ) );
  }

  @Test
  public void testRenderIntialToolTipMarkupEnabled() throws IOException {
    column.setData( RWT.TOOLTIP_MARKUP_ENABLED, Boolean.TRUE );

    lca.renderChanges( column );

    TestMessage message = getProtocolMessage();
    assertTrue( "foo", message.findSetProperty( column, "toolTipMarkupEnabled" ).asBoolean() );
  }

  @Test
  public void testRenderToolTipMarkupEnabled() throws IOException {
    column.setData( RWT.TOOLTIP_MARKUP_ENABLED, Boolean.TRUE );
    Fixture.markInitialized( column );

    lca.renderChanges( column );

    TestMessage message = getProtocolMessage();
    assertNull( message.findSetOperation( column, "toolTipMarkupEnabled" ) );
  }

  @Test
  public void testRenderInitialToolTip() throws IOException {
    lca.render( column );

    TestMessage message = Fixture.getProtocolMessage();
    CreateOperation operation = message.findCreateOperation( column );
    assertFalse( operation.getProperties().names().contains( "toolTip" ) );
  }

  @Test
  public void testRenderToolTip() throws IOException {
    column.setToolTipText( "foo" );
    lca.renderChanges( column );

    TestMessage message = Fixture.getProtocolMessage();
    assertEquals( "foo", message.findSetProperty( column, "toolTip" ).asString() );
  }

  @Test
  public void testRenderToolTipUnchanged() throws IOException {
    Fixture.markInitialized( display );
    Fixture.markInitialized( column );

    column.setToolTipText( "foo" );
    Fixture.preserveWidgets();
    lca.renderChanges( column );

    TestMessage message = Fixture.getProtocolMessage();
    assertNull( message.findSetOperation( column, "toolTip" ) );
  }

  @Test
  public void testRenderCustomVariant() throws IOException {
    column.setData( RWT.CUSTOM_VARIANT, "blue" );
    lca.renderChanges( column );

    TestMessage message = Fixture.getProtocolMessage();
    assertEquals( "variant_blue", message.findSetProperty( column, "customVariant" ).asString() );
  }

  @Test
  public void testRenderInitialText() throws IOException {
    lca.render( column );

    TestMessage message = Fixture.getProtocolMessage();
    CreateOperation operation = message.findCreateOperation( column );
    assertFalse( operation.getProperties().names().contains( "text" ) );
  }

  @Test
  public void testRenderText() throws IOException {
    column.setText( "foo" );
    lca.renderChanges( column );

    TestMessage message = Fixture.getProtocolMessage();
    assertEquals( "foo", message.findSetProperty( column, "text" ).asString() );
  }

  @Test
  public void testRenderTextUnchanged() throws IOException {
    Fixture.markInitialized( display );
    Fixture.markInitialized( column );

    column.setText( "foo" );
    Fixture.preserveWidgets();
    lca.renderChanges( column );

    TestMessage message = Fixture.getProtocolMessage();
    assertNull( message.findSetOperation( column, "text" ) );
  }

  @Test
  public void testRenderInitialImage() throws IOException {
    lca.renderChanges( column );

    TestMessage message = Fixture.getProtocolMessage();
    assertNull( message.findSetOperation( column, "image" ) );
  }

  @Test
  public void testRenderImage() throws IOException {
    Image image = createImage( display, Fixture.IMAGE_100x50 );

    column.setImage( image );
    lca.renderChanges( column );

    TestMessage message = Fixture.getProtocolMessage();
    String imageLocation = ImageFactory.getImagePath( image );
    JsonArray expected = new JsonArray().add( imageLocation ).add( 100 ).add( 50 );
    assertEquals( expected, message.findSetProperty( column, "image" ) );
  }

  @Test
  public void testRenderImageUnchanged() throws IOException {
    Fixture.markInitialized( display );
    Fixture.markInitialized( column );
    Image image = createImage( display, Fixture.IMAGE_100x50 );

    column.setImage( image );
    Fixture.preserveWidgets();
    lca.renderChanges( column );

    TestMessage message = Fixture.getProtocolMessage();
    assertNull( message.findSetOperation( column, "image" ) );
  }

  @Test
  public void testRenderImageReset() throws IOException {
    Fixture.markInitialized( display );
    Fixture.markInitialized( column );
    Image image = createImage( display, Fixture.IMAGE_100x50 );
    column.setImage( image );

    Fixture.preserveWidgets();
    column.setImage( null );
    lca.renderChanges( column );

    TestMessage message = Fixture.getProtocolMessage();
    assertEquals( JsonObject.NULL, message.findSetProperty( column, "image" ) );
  }

  @Test
  public void testRenderInitialLeft() throws IOException {
    lca.render( column );

    TestMessage message = Fixture.getProtocolMessage();
    CreateOperation operation = message.findCreateOperation( column );
    assertFalse( operation.getProperties().names().contains( "left" ) );
  }

  @Test
  public void testRenderLeft() throws IOException {
    TableColumn col2 = new TableColumn( table, SWT.NONE, 0 );
    col2.setWidth( 50 );
    lca.renderChanges( column );

    TestMessage message = Fixture.getProtocolMessage();
    assertEquals( 50, message.findSetProperty( column, "left" ).asInt() );
  }

  @Test
  public void testRenderLeftUnchanged() throws IOException {
    Fixture.markInitialized( display );
    Fixture.markInitialized( column );

    TableColumn col2 = new TableColumn( table, SWT.NONE, 0 );
    col2.setWidth( 50 );
    Fixture.preserveWidgets();
    lca.renderChanges( column );

    TestMessage message = Fixture.getProtocolMessage();
    assertNull( message.findSetOperation( column, "left" ) );
  }

  @Test
  public void testRenderInitialWidth() throws IOException {
    lca.render( column );

    TestMessage message = Fixture.getProtocolMessage();
    CreateOperation operation = message.findCreateOperation( column );
    assertFalse( operation.getProperties().names().contains( "width" ) );
  }

  @Test
  public void testRenderWidth() throws IOException {
    column.setWidth( 50 );
    lca.renderChanges( column );

    TestMessage message = Fixture.getProtocolMessage();
    assertEquals( 50, message.findSetProperty( column, "width" ).asInt() );
  }

  @Test
  public void testRenderWidthUnchanged() throws IOException {
    Fixture.markInitialized( display );
    Fixture.markInitialized( column );

    column.setWidth( 50 );
    Fixture.preserveWidgets();
    lca.renderChanges( column );

    TestMessage message = Fixture.getProtocolMessage();
    assertNull( message.findSetOperation( column, "width" ) );
  }

  @Test
  public void testRenderInitialResizable() throws IOException {
    lca.render( column );

    TestMessage message = Fixture.getProtocolMessage();
    CreateOperation operation = message.findCreateOperation( column );
    assertFalse( operation.getProperties().names().contains( "resizable" ) );
  }

  @Test
  public void testRenderResizable() throws IOException {
    column.setResizable( false );
    lca.renderChanges( column );

    TestMessage message = Fixture.getProtocolMessage();
    assertEquals( JsonValue.FALSE, message.findSetProperty( column, "resizable" ) );
  }

  @Test
  public void testRenderResizableUnchanged() throws IOException {
    Fixture.markInitialized( display );
    Fixture.markInitialized( column );

    column.setResizable( false );
    Fixture.preserveWidgets();
    lca.renderChanges( column );

    TestMessage message = Fixture.getProtocolMessage();
    assertNull( message.findSetOperation( column, "resizable" ) );
  }

  @Test
  public void testRenderInitialMoveable() throws IOException {
    lca.render( column );

    TestMessage message = Fixture.getProtocolMessage();
    CreateOperation operation = message.findCreateOperation( column );
    assertFalse( operation.getProperties().names().contains( "moveable" ) );
  }

  @Test
  public void testRenderMoveable() throws IOException {
    column.setMoveable( true );
    lca.renderChanges( column );

    TestMessage message = Fixture.getProtocolMessage();
    assertEquals( JsonValue.TRUE, message.findSetProperty( column, "moveable" ) );
  }

  @Test
  public void testRenderMoveableUnchanged() throws IOException {
    Fixture.markInitialized( display );
    Fixture.markInitialized( column );

    column.setMoveable( true );
    Fixture.preserveWidgets();
    lca.renderChanges( column );

    TestMessage message = Fixture.getProtocolMessage();
    assertNull( message.findSetOperation( column, "moveable" ) );
  }

  @Test
  public void testRenderInitialAlignment() throws IOException {
    lca.render( column );

    TestMessage message = Fixture.getProtocolMessage();
    CreateOperation operation = message.findCreateOperation( column );
    assertFalse( operation.getProperties().names().contains( "alignment" ) );
  }

  @Test
  public void testRenderAlignment() throws IOException {
    column.setAlignment( SWT.RIGHT );
    lca.renderChanges( column );

    TestMessage message = Fixture.getProtocolMessage();
    assertEquals( "right", message.findSetProperty( column, "alignment" ).asString() );
  }

  @Test
  public void testRenderAlignmentUnchanged() throws IOException {
    Fixture.markInitialized( display );
    Fixture.markInitialized( column );

    column.setAlignment( SWT.RIGHT );
    Fixture.preserveWidgets();
    lca.renderChanges( column );

    TestMessage message = Fixture.getProtocolMessage();
    assertNull( message.findSetOperation( column, "alignment" ) );
  }

  @Test
  public void testRenderInitialFixed() throws IOException {
    lca.render( column );

    TestMessage message = Fixture.getProtocolMessage();
    CreateOperation operation = message.findCreateOperation( column );
    assertFalse( operation.getProperties().names().contains( "fixed" ) );
  }

  @Test
  public void testRenderFixed() throws IOException {
    table.setData( RWT.FIXED_COLUMNS, Integer.valueOf( 1 ) );
    lca.renderChanges( column );

    TestMessage message = Fixture.getProtocolMessage();
    assertEquals( JsonValue.TRUE, message.findSetProperty( column, "fixed" ) );
  }

  @Test
  public void testRenderFixedUnchanged() throws IOException {
    Fixture.markInitialized( display );
    Fixture.markInitialized( column );

    table.setData( "fixedColumns", Integer.valueOf( 1 ) );
    Fixture.preserveWidgets();
    lca.renderChanges( column );

    TestMessage message = Fixture.getProtocolMessage();
    assertNull( message.findSetOperation( column, "fixed" ) );
  }

  @Test
  public void testRenderAddSelectionListener() throws Exception {
    Fixture.markInitialized( display );
    Fixture.markInitialized( column );
    Fixture.preserveWidgets();

    column.addListener( SWT.Selection, mock( Listener.class ) );
    lca.renderChanges( column );

    TestMessage message = Fixture.getProtocolMessage();
    assertEquals( JsonValue.TRUE, message.findListenProperty( column, "Selection" ) );
  }

  @Test
  public void testRenderRemoveSelectionListener() throws Exception {
    Listener listener = mock( Listener.class );
    column.addListener( SWT.Selection, listener );
    Fixture.markInitialized( display );
    Fixture.markInitialized( column );
    Fixture.preserveWidgets();

    column.removeListener( SWT.Selection, listener );
    lca.renderChanges( column );

    TestMessage message = Fixture.getProtocolMessage();
    assertEquals( JsonValue.FALSE, message.findListenProperty( column, "Selection" ) );
  }

  @Test
  public void testRenderSelectionListenerUnchanged() throws Exception {
    Fixture.markInitialized( display );
    Fixture.markInitialized( column );
    Fixture.preserveWidgets();

    column.addSelectionListener( new SelectionAdapter() { } );
    Fixture.preserveWidgets();
    lca.renderChanges( column );

    TestMessage message = Fixture.getProtocolMessage();
    assertNull( message.findListenOperation( column, "selection" ) );
  }

  @Test
  public void testRenderInitialFont() throws IOException {
    lca.render( column );

    TestMessage message = Fixture.getProtocolMessage();
    CreateOperation operation = message.findCreateOperation( column );
    assertFalse( operation.getProperties().names().contains( "font" ) );
  }

  @Test
  public void testRenderFont() throws IOException {
    table.setFont( new Font( display, "Arial", 12, SWT.NORMAL ) );

    lca.renderChanges( column );

    TestMessage message = Fixture.getProtocolMessage();
    JsonArray expected = JsonArray.readFrom( "[[\"Arial\"], 12, false, false]" );
    assertEquals( expected, message.findSetProperty( column, "font" ) );
  }

  @Test
  public void testRenderFontUnchanged() throws IOException {
    Fixture.markInitialized( display );
    Fixture.markInitialized( column );
    table.setFont( new Font( display, "Arial", 12, SWT.NORMAL ) );

    Fixture.preserveWidgets();
    lca.renderChanges( column );

    TestMessage message = Fixture.getProtocolMessage();
    assertNull( message.findSetOperation( column, "font" ) );
  }

  @Test
  public void testResetFont() throws IOException {
    Fixture.markInitialized( display );
    Fixture.markInitialized( column );
    table.setFont( new Font( display, "Arial", 12, SWT.NORMAL ) );

    Fixture.preserveWidgets();
    table.setFont( null );
    lca.renderChanges( column );

    TestMessage message = Fixture.getProtocolMessage();
    assertEquals( JsonObject.NULL, message.findSetProperty( column, "font" ) );
  }

  @Test
  public void testRenderData() throws IOException {
    registerDataKeys( new String[]{ "foo", "bar" } );
    column.setData( "foo", "string" );
    column.setData( "bar", Integer.valueOf( 1 ) );

    lca.renderChanges( column );

    TestMessage message = Fixture.getProtocolMessage();
    JsonObject data = ( JsonObject )message.findSetProperty( column, "data" );
    assertEquals( "string", data.get( "foo" ).asString() );
    assertEquals( 1, data.get( "bar" ).asInt() );
  }

  @Test
  public void testRenderDataUnchanged() throws IOException {
    registerDataKeys( new String[]{ "foo" } );
    column.setData( "foo", "string" );
    Fixture.markInitialized( display );
    Fixture.markInitialized( column );

    Fixture.preserveWidgets();
    lca.renderChanges( column );

    TestMessage message = Fixture.getProtocolMessage();
    assertEquals( 0, message.getOperationCount() );
  }

}
