
import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";
import { getAssets } from "store/assets/actions";
import AssetColumns from "./AssetColumns";

import './Asset.css';

const Assets = (props) => {
  const { assets, onGetAssets } = props;
  const {assetList, setAssetList] = useState([]);
  const pageOptions = {
    sizePerPage: 10,
    totalSize: 50, // replace later with size{assetList),
    custom: true,
  };
  const { SearchBar } = Search;

  useEffect(() => {
    onGetAssets();
    setAssetList(assets);
  }, [onGetAssets]);

  useEffect(() => {
    if (!isEmpty(assets)) {
      setAssetList(assets);
    }
  }, [assets]);

  // eslint-disable-next-line no-unused-vars
  const handleTableChange = (type, { page, searchText }) => {
    setAssetList(
      assets.filter((asset) =>
        Object.keys(asset).some((key) =>
          asset[key].toLowerCase().includes(searchText.toLowerCase())
        )
      )
    );
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>
            Assets | Skote - Responsive Bootstrap 5 Admin Dashboard
          </title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="Assets" breadcrumbItem="Assets" />
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        data={assetList || []}
                        columns={AssetColumns()}
                        bootstrap4
                        search
                      >
                        {(toolkitProps) => (
                          <React.Fragment>
                            <Row className="mb-2">
                              <Col sm="4">
                                <div className="search-box ms-2 mb-2 d-inline-block">
                                  <div className="position-relative">
                                    <SearchBar {...toolkitProps.searchProps} />
                                    <i className="bx bx-search-alt search-icon" />
                                  </div>
                                </div>
                              </Col>
                              <Col sm="8">
                                <div className="text-sm-end">
                                  <Button
                                    type="button"
                                    color="success"
                                    className="btn-rounded waves-effect waves-light mb-2 me-2"
                                  >
                                    <i className="mdi mdi-plus me-1" />
                                    New asset
                                  </Button>
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col xl="12">
                                <div className="table-responsive">
                                  <BootstrapTable
                                    responsive
                                    remote
                                    bordered={false}
                                    striped={false}
                                    classes={"table align-middle table-nowrap"}
                                    keyField="id"
                                    {...toolkitProps.baseProps}
                                    onTableChange={handleTableChange}
                                    {...paginationTableProps}
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row className="align-items-md-center mt-30">
                              <Col className="pagination pagination-rounded justify-content-end mb-2 inner-custom-pagination">
                                <PaginationListStandalone
                                  {...paginationProps}
                                />
                              </Col>
                            </Row>
                          </React.Fragment>
                        )}
                      </ToolkitProvider>
                    )}
                  </PaginationProvider>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

Assets.propTypes = {
  assets: PropTypes.array,
  onGetAssets: PropTypes.func,
};

const mapStateToProps = ({ data }) => ({
  assets: data.assets,
});

const mapDispatchToProps = (dispatch) => ({
  onGetAssets: () => dispatch(getAssets()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Assets);

  