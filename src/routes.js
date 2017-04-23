import {h} from 'preact';
import {Router} from 'preact-router';
import RoutedView from './core/routedView.js';
import LoadingView from './core/loadingView.js';
import {LIST_TYPES} from './lists/constants.js';

import ListView from './lists/views/list.js';

const ROUTE_BUNDLE = {
  about: require('bundle-loader?lazy&name=AboutHome!./about/views/about.js'),
  item: require('bundle-loader?lazy&name=ItemHome!./item/views/item.js'),
  user: require('bundle-loader?lazy&name=UserHome!./lists/views/user.js')
};

export default function(props) {
  return (
    <Router>
      <RoutedView
        path='/new'
        listType={LIST_TYPES.new}
        child={ListView}
        {...props}>
      </RoutedView>
      <RoutedView
        path='/new/:page'
        listType={LIST_TYPES.new}
        child={ListView}
        {...props}>
      </RoutedView>
      <RoutedView
        path='/show'
        listType={LIST_TYPES.show}
        child={ListView}
        {...props}>
      </RoutedView>
      <RoutedView
        path='/show/:page'  
        listType={LIST_TYPES.show}
        child={ListView}
        {...props}>
      </RoutedView>
      <RoutedView
        path='/ask'  
        listType={LIST_TYPES.ask}
        child={ListView}
        {...props}>
      </RoutedView>
      <RoutedView
        path='/ask/:page'
        listType={LIST_TYPES.ask}
        child={ListView}
        {...props}>
      </RoutedView>
      <RoutedView
        path='/jobs'
        listType={LIST_TYPES.jobs}
        child={ListView}
        {...props}>
      </RoutedView>
      <RoutedView
        path='/jobs/:page'
        listType={LIST_TYPES.jobs}
        child={ListView}
        {...props}>
      </RoutedView>
      <RoutedView
        path='/about'  
        load={ROUTE_BUNDLE.about}
        {...props}>
        <LoadingView />
      </RoutedView>
      <RoutedView
        path='/item/:id'  
        load={ROUTE_BUNDLE.item}
        name='ItemHome'
        {...props}>
        <LoadingView />
      </RoutedView>
      <RoutedView
        path='/user/:id'  
        load={ROUTE_BUNDLE.user}
        {...props}>
        <LoadingView />
      </RoutedView>
      <RoutedView
        path="/top/:page" default
        listType={LIST_TYPES.top}
        child={ListView}
        {...props}>
      </RoutedView>
    </Router>
  );
}