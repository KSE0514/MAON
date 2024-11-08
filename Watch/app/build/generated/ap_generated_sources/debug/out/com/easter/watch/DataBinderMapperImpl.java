package com.easter.watch;

import android.util.SparseArray;
import android.util.SparseIntArray;
import android.view.View;
import androidx.databinding.DataBinderMapper;
import androidx.databinding.DataBindingComponent;
import androidx.databinding.ViewDataBinding;
import com.easter.watch.databinding.ActivityAuthBindingImpl;
import com.easter.watch.databinding.ActivityRestartBindingImpl;
import com.easter.watch.databinding.ActivityRunBindingImpl;
import com.easter.watch.databinding.ActivityStartBindingImpl;
import com.easter.watch.databinding.FragmentRun1BindingImpl;
import com.easter.watch.databinding.FragmentRun2BindingImpl;
import com.easter.watch.databinding.FragmentRun3BindingImpl;
import java.lang.IllegalArgumentException;
import java.lang.Integer;
import java.lang.Object;
import java.lang.Override;
import java.lang.RuntimeException;
import java.lang.String;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class DataBinderMapperImpl extends DataBinderMapper {
  private static final int LAYOUT_ACTIVITYAUTH = 1;

  private static final int LAYOUT_ACTIVITYRESTART = 2;

  private static final int LAYOUT_ACTIVITYRUN = 3;

  private static final int LAYOUT_ACTIVITYSTART = 4;

  private static final int LAYOUT_FRAGMENTRUN1 = 5;

  private static final int LAYOUT_FRAGMENTRUN2 = 6;

  private static final int LAYOUT_FRAGMENTRUN3 = 7;

  private static final SparseIntArray INTERNAL_LAYOUT_ID_LOOKUP = new SparseIntArray(7);

  static {
    INTERNAL_LAYOUT_ID_LOOKUP.put(com.easter.watch.R.layout.activity_auth, LAYOUT_ACTIVITYAUTH);
    INTERNAL_LAYOUT_ID_LOOKUP.put(com.easter.watch.R.layout.activity_restart, LAYOUT_ACTIVITYRESTART);
    INTERNAL_LAYOUT_ID_LOOKUP.put(com.easter.watch.R.layout.activity_run, LAYOUT_ACTIVITYRUN);
    INTERNAL_LAYOUT_ID_LOOKUP.put(com.easter.watch.R.layout.activity_start, LAYOUT_ACTIVITYSTART);
    INTERNAL_LAYOUT_ID_LOOKUP.put(com.easter.watch.R.layout.fragment_run1, LAYOUT_FRAGMENTRUN1);
    INTERNAL_LAYOUT_ID_LOOKUP.put(com.easter.watch.R.layout.fragment_run2, LAYOUT_FRAGMENTRUN2);
    INTERNAL_LAYOUT_ID_LOOKUP.put(com.easter.watch.R.layout.fragment_run3, LAYOUT_FRAGMENTRUN3);
  }

  @Override
  public ViewDataBinding getDataBinder(DataBindingComponent component, View view, int layoutId) {
    int localizedLayoutId = INTERNAL_LAYOUT_ID_LOOKUP.get(layoutId);
    if(localizedLayoutId > 0) {
      final Object tag = view.getTag();
      if(tag == null) {
        throw new RuntimeException("view must have a tag");
      }
      switch(localizedLayoutId) {
        case  LAYOUT_ACTIVITYAUTH: {
          if ("layout/activity_auth_0".equals(tag)) {
            return new ActivityAuthBindingImpl(component, view);
          }
          throw new IllegalArgumentException("The tag for activity_auth is invalid. Received: " + tag);
        }
        case  LAYOUT_ACTIVITYRESTART: {
          if ("layout/activity_restart_0".equals(tag)) {
            return new ActivityRestartBindingImpl(component, view);
          }
          throw new IllegalArgumentException("The tag for activity_restart is invalid. Received: " + tag);
        }
        case  LAYOUT_ACTIVITYRUN: {
          if ("layout/activity_run_0".equals(tag)) {
            return new ActivityRunBindingImpl(component, view);
          }
          throw new IllegalArgumentException("The tag for activity_run is invalid. Received: " + tag);
        }
        case  LAYOUT_ACTIVITYSTART: {
          if ("layout/activity_start_0".equals(tag)) {
            return new ActivityStartBindingImpl(component, view);
          }
          throw new IllegalArgumentException("The tag for activity_start is invalid. Received: " + tag);
        }
        case  LAYOUT_FRAGMENTRUN1: {
          if ("layout/fragment_run1_0".equals(tag)) {
            return new FragmentRun1BindingImpl(component, view);
          }
          throw new IllegalArgumentException("The tag for fragment_run1 is invalid. Received: " + tag);
        }
        case  LAYOUT_FRAGMENTRUN2: {
          if ("layout/fragment_run2_0".equals(tag)) {
            return new FragmentRun2BindingImpl(component, view);
          }
          throw new IllegalArgumentException("The tag for fragment_run2 is invalid. Received: " + tag);
        }
        case  LAYOUT_FRAGMENTRUN3: {
          if ("layout/fragment_run3_0".equals(tag)) {
            return new FragmentRun3BindingImpl(component, view);
          }
          throw new IllegalArgumentException("The tag for fragment_run3 is invalid. Received: " + tag);
        }
      }
    }
    return null;
  }

  @Override
  public ViewDataBinding getDataBinder(DataBindingComponent component, View[] views, int layoutId) {
    if(views == null || views.length == 0) {
      return null;
    }
    int localizedLayoutId = INTERNAL_LAYOUT_ID_LOOKUP.get(layoutId);
    if(localizedLayoutId > 0) {
      final Object tag = views[0].getTag();
      if(tag == null) {
        throw new RuntimeException("view must have a tag");
      }
      switch(localizedLayoutId) {
      }
    }
    return null;
  }

  @Override
  public int getLayoutId(String tag) {
    if (tag == null) {
      return 0;
    }
    Integer tmpVal = InnerLayoutIdLookup.sKeys.get(tag);
    return tmpVal == null ? 0 : tmpVal;
  }

  @Override
  public String convertBrIdToString(int localId) {
    String tmpVal = InnerBrLookup.sKeys.get(localId);
    return tmpVal;
  }

  @Override
  public List<DataBinderMapper> collectDependencies() {
    ArrayList<DataBinderMapper> result = new ArrayList<DataBinderMapper>(1);
    result.add(new androidx.databinding.library.baseAdapters.DataBinderMapperImpl());
    return result;
  }

  private static class InnerBrLookup {
    static final SparseArray<String> sKeys = new SparseArray<String>(1);

    static {
      sKeys.put(0, "_all");
    }
  }

  private static class InnerLayoutIdLookup {
    static final HashMap<String, Integer> sKeys = new HashMap<String, Integer>(7);

    static {
      sKeys.put("layout/activity_auth_0", com.easter.watch.R.layout.activity_auth);
      sKeys.put("layout/activity_restart_0", com.easter.watch.R.layout.activity_restart);
      sKeys.put("layout/activity_run_0", com.easter.watch.R.layout.activity_run);
      sKeys.put("layout/activity_start_0", com.easter.watch.R.layout.activity_start);
      sKeys.put("layout/fragment_run1_0", com.easter.watch.R.layout.fragment_run1);
      sKeys.put("layout/fragment_run2_0", com.easter.watch.R.layout.fragment_run2);
      sKeys.put("layout/fragment_run3_0", com.easter.watch.R.layout.fragment_run3);
    }
  }
}
