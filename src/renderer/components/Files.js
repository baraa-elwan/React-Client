import React, { Component } from 'react'

//components

//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

//action creator
import FilesTable from '../containers/tables/files'

//styles
import { styles } from './styles'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Header from './Header'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'

import '../tabs.css'


export default class Files extends Component {
	constructor(props) {
		super(props)

	}


	render() {
		return (

			<div className='col-12 '>
				<div className='m-contents'>
					<Header title='Files' />

					<Tabs
						activeLinkStyle={styles.activeLinkStyle}
						visibleTabStyle={styles.visibleTabStyle}
						style={styles.tabs}
						onChange={tab => {/*console.log(`Tab selected: ${tab}`)}*/}} // eslint-disable-line no-console
						selectedTab={'tab1'}

					>
						<div style={styles.links}>
							<TabLink to="tab1" style={styles.tabLink}>
								My Files
        					</TabLink>
							<TabLink to="tab2" default style={styles.tabLink}>
								All Files
        					</TabLink>
							
						</div>

						<div style={styles.content}>
							<TabContent for="tab1">
								<FilesTable />
							</TabContent>
							<TabContent for="tab2">
								<FilesTable />
							</TabContent>

						</div>
					</Tabs>
				</div>
			</div>
		)
	}
}
