/*******************************************************************************
 * Copyright (c) 2002, 2009 Innoopract Informationssysteme GmbH.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Innoopract Informationssysteme GmbH - initial API and implementation
 ******************************************************************************/
package org.eclipse.swt.internal.widgets;

import java.util.ArrayList;

import org.eclipse.swt.SWT;
import org.eclipse.swt.events.*;
import org.eclipse.swt.internal.events.ShowEvent;
import org.eclipse.swt.internal.events.ShowListener;
import org.eclipse.swt.widgets.*;


public final class UntypedEventAdapter
  implements ControlListener, 
             DisposeListener,
             SelectionListener,
             FocusListener, 
             TreeListener, 
             ShellListener, 
             MenuListener, 
             ModifyListener,
             SetDataListener,
             VerifyListener,
             MouseListener,
             KeyListener,
             TraverseListener,
             ShowListener
{

  private class Entry {
    final int eventType;
    final Listener listener;
    private Entry( final int eventType, final Listener listener ) {
      this.eventType = eventType;
      this.listener = listener;
    }
  }
  
  private final java.util.List listeners = new ArrayList();

  public void controlMoved( final ControlEvent evt ) {
    Event event = createEvent( SWT.Move, evt.getSource() );
    dispatchEvent( event );
  }

  public void controlResized( final ControlEvent evt ) {
    Event event = createEvent( SWT.Resize, evt.getSource() );
    dispatchEvent( event );
  }

  public void widgetDisposed( final DisposeEvent evt ) {
    Event event = createEvent( SWT.Dispose, evt.getSource() );
    dispatchEvent( event );
  }

  public void widgetDefaultSelected( final SelectionEvent evt ) {
    Event event = createEvent( SWT.DefaultSelection, evt.getSource() );
    event.x = evt.x;
    event.y = evt.y;
    event.height = evt.height;
    event.width = evt.width;
    event.item = evt.item;
    dispatchEvent( event );
  }

  public void widgetSelected( final SelectionEvent evt ) {
    Event event = createEvent( SWT.Selection, evt.getSource() );
    event.x = evt.x;
    event.y = evt.y;
    event.height = evt.height;
    event.width = evt.width;
    event.detail = evt.detail;
    event.item = evt.item;
    event.text = evt.text;
    dispatchEvent( event );
  }

  public void focusGained( final FocusEvent evt ) {
    Event event = createEvent( SWT.FocusIn, evt.getSource() );
    dispatchEvent( event );
  }

  public void focusLost( final FocusEvent evt ) {
    Event event = createEvent( SWT.FocusOut, evt.getSource() );
    dispatchEvent( event );
  }

  public void treeCollapsed( final TreeEvent evt ) {
    Event event = createEvent( SWT.Collapse, evt.getSource() );
    event.item = evt.item;
    dispatchEvent( event );
  }

  public void treeExpanded( final TreeEvent evt ) {
    Event event = createEvent( SWT.Expand, evt.getSource() );
    event.item = evt.item;
    dispatchEvent( event );
  }

  public void shellActivated( final ShellEvent evt ) {
    Event event = createEvent( SWT.Activate, evt.getSource() );
    dispatchEvent( event );
  }

  public void shellClosed( final ShellEvent evt ) {
    Event event = createEvent( SWT.Close, evt.getSource() );
    dispatchEvent( event );
  }

  public void shellDeactivated( final ShellEvent evt ) {
    Event event = createEvent( SWT.Deactivate, evt.getSource() );
    dispatchEvent( event );
  }

  public void menuHidden( final MenuEvent evt ) {
    Event event = createEvent( SWT.Hide, evt.getSource() );
    dispatchEvent( event );
  }

  public void menuShown( final MenuEvent evt ) {
    Event event = createEvent( SWT.Show, evt.getSource() );
    dispatchEvent( event );
  }

  public void modifyText( final ModifyEvent evt ) {
    Event event = createEvent( SWT.Modify, evt.getSource() );
    dispatchEvent( event );
  }
  
  public void verifyText( final VerifyEvent evt ) {
    Event event = createEvent( SWT.Verify, evt.getSource() );
    event.doit = evt.doit;
    event.text = evt.text;
    dispatchEvent( event );
  }
  
  public void update( final SetDataEvent evt ) {
    Event event = createEvent( SWT.SetData, evt.getSource() );
    event.item = evt.item;
    event.index = evt.index;
    dispatchEvent( event );
  }
  
  public void mouseDown( final MouseEvent evt ) {
    Event event = createEvent( SWT.MouseDown, evt.getSource() );
    event.button = evt.button;
    event.x = evt.x;
    event.y = evt.y;
    event.time = evt.time;
    dispatchEvent( event );
  }
  
  public void mouseUp( final MouseEvent evt ) {
    Event event = createEvent( SWT.MouseUp, evt.getSource() );
    event.button = evt.button;
    event.x = evt.x;
    event.y = evt.y;
    event.time = evt.time;
    dispatchEvent( event );
  }
  
  public void mouseDoubleClick( final MouseEvent evt ) {
    Event event = createEvent( SWT.MouseDoubleClick, evt.getSource() );
    event.button = evt.button;
    event.x = evt.x;
    event.y = evt.y;
    event.time = evt.time;
    dispatchEvent( event );
  }
  
  public void keyPressed( final KeyEvent typedEvent ) {
    Event event = createEvent( SWT.KeyDown, typedEvent.getSource() );
    event.character = typedEvent.character;
    event.keyCode = typedEvent.keyCode;
    event.stateMask = typedEvent.stateMask;
    event.doit = typedEvent.doit;
    event.data = typedEvent.data;
    dispatchEvent( event );
    typedEvent.doit = event.doit;
  }
  
  public void keyReleased( final KeyEvent typedEvent ) {
    Event event = createEvent( SWT.KeyUp, typedEvent.getSource() );
    event.character = typedEvent.character;
    event.keyCode = typedEvent.keyCode;
    event.stateMask = typedEvent.stateMask;
    event.doit = typedEvent.doit;
    event.data = typedEvent.data;
    dispatchEvent( event );
  }
  
  public void keyTraversed( final TraverseEvent typedEvent ) {
    Event event = createEvent( SWT.Traverse, typedEvent.getSource() );
    event.character = typedEvent.character;
    event.keyCode = typedEvent.keyCode;
    event.stateMask = typedEvent.stateMask;
    event.doit = typedEvent.doit;
    event.data = typedEvent.data;
    event.detail = typedEvent.detail;
    dispatchEvent( event );
    typedEvent.doit = event.doit;
  }
  
  public void controlShown( final ShowEvent typedEvent ) {
    Event event = createEvent( SWT.Show, typedEvent.getSource() );
    dispatchEvent( event );
  }
  
  public void controlHidden( final ShowEvent typedEvent ) {
    Event event = createEvent( SWT.Hide, typedEvent.getSource() );
    dispatchEvent( event );
  }
  
  public void addListener( final Widget widget, 
                           final int eventType,
                           final Listener listener )
  {
    boolean validEventType = true;
    switch( eventType ) {
      case SWT.Move:
      case SWT.Resize:
        ControlEvent.addListener( widget, this );
      break;
      case SWT.Dispose:
        DisposeEvent.addListener( widget, this );
      break;
      case SWT.Selection:
      case SWT.DefaultSelection:
        SelectionEvent.addListener( widget, this );
      break;
      case SWT.FocusIn:
      case SWT.FocusOut:
        FocusEvent.addListener( widget, this );
      break;
      case SWT.Expand:
      case SWT.Collapse:
        TreeEvent.addListener( widget, ( TreeListener )this );
      break;
      case SWT.Activate:
      case SWT.Deactivate:
      case SWT.Close:
        ShellEvent.addListener( widget, this );
      break;
      case SWT.Hide:
        if( widget instanceof Control ) {
          ShowEvent.addListener( widget, this );
        } else {
          MenuEvent.addListener( widget, this );
        }
        break;
      case SWT.Show:
        if( widget instanceof Control ) {
          ShowEvent.addListener( widget, this );
        } else {
          MenuEvent.addListener( widget, this );
        }
      break;
      case SWT.Modify:
        ModifyEvent.addListener( widget, this );
      break;
      case SWT.Verify:
        VerifyEvent.addListener( widget, this );
      break;
      case SWT.SetData:
        SetDataEvent.addListener( widget, this );
      break;
      case SWT.MouseDown:
      case SWT.MouseUp:
      case SWT.MouseDoubleClick:
        MouseEvent.addListener( widget, this );
      break;
      case SWT.KeyDown:
      case SWT.KeyUp:
        KeyEvent.addListener( widget, this );
      break;
      case SWT.Traverse:
        TraverseEvent.addListener( widget, ( TraverseListener )this );
      break;
      default:
        validEventType = false;
    }
    if( validEventType ) {
      addListener( eventType, listener );
    }
  }

  public void removeListener( final Widget widget, 
                              final int eventType, 
                              final Listener listener )
  {
    boolean validEventType = true;
    switch( eventType ) {
      case SWT.Move:
      case SWT.Resize:
        ControlEvent.removeListener( widget, this );
      break;
      case SWT.Dispose:
        DisposeEvent.removeListener( widget, this );
      break;
      case SWT.Selection:
      case SWT.DefaultSelection:
        SelectionEvent.removeListener( widget, this );
      break;
      case SWT.FocusIn:
      case SWT.FocusOut:
        FocusEvent.removeListener( widget, this );
      break;
      case SWT.Expand:
      case SWT.Collapse:
        TreeEvent.removeListener( widget, ( TreeListener )this );
      break;
      case SWT.Activate:
      case SWT.Deactivate:
      case SWT.Close:
        ShellEvent.removeListener( widget, this );
      break;
      case SWT.Hide:
        if( widget instanceof Control ) {
          ShowEvent.removeListener( widget, this );
        } else {
          MenuEvent.removeListener( widget, this );
        }
        break;
      case SWT.Show:
        if( widget instanceof Control ) {
          ShowEvent.removeListener( widget, this );
        } else {
          MenuEvent.removeListener( widget, this );
        }
      break;
      case SWT.Modify:
        ModifyEvent.removeListener( widget, this );
      break;
      case SWT.Verify:
        VerifyEvent.removeListener( widget, this );
      break;
      case SWT.SetData:
        SetDataEvent.removeListener( widget, this );
      break;
      case SWT.MouseDown:
      case SWT.MouseUp:
      case SWT.MouseDoubleClick:
        MouseEvent.removeListener( widget, this );
      break;
      case SWT.KeyDown:
      case SWT.KeyUp:
        KeyEvent.removeListener( widget, this );
      break;
      case SWT.Traverse:
        TraverseEvent.removeListener( widget, ( TraverseListener )this );
      break;
      default:
        validEventType = false;
    }
    if( validEventType ) {
      removeListener( eventType, listener );
    }
  }

  void addListener( final int eventType, final Listener listener ) {
    listeners.add( new Entry( eventType, listener ) );
  }
  
  void removeListener( final int eventType, final Listener listener ) {
    Entry[] entries = getEntries();
    boolean found = false;
    for( int i = 0; !found && i < entries.length; i++ ) {
      // TODO [fappel]: check whether we have also to compare eventType!
      found = entries[ i ].listener == listener;
      if( found ) {
        listeners.remove( entries[ i ] );
      }
    }
  }

  public boolean isEmpty() {
    return listeners.isEmpty();
  }

  
  //////////////////
  // helping methods

  private void dispatchEvent( final Event event ) {
    // [rh] protect against manipulating the event type in listener code
    int eventType = event.type;
    Entry[] entries = getEntries();
    for( int i = 0; i < entries.length; i++ ) {
      if( entries[ i ].eventType == eventType ) {
        entries[ i ].listener.handleEvent( event );
      }
    }
  }
  
  private Entry[] getEntries() {
    Entry[] result = new Entry[ listeners.size() ];
    listeners.toArray( result );
    return result;
  }
  
  private static Event createEvent( final int eventType, final Object source ) {
    Widget widget = ( Widget )source;
    Event result = new Event();
    result.type = eventType;
    result.widget = widget;
    result.display = widget.getDisplay();
    return result;
  }
}
