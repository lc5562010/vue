<template>
    <div>
        <Row>
            <Col span="24">
                <Input style="width:200px;float:left;" placeholder="请输入设备编号">
                    <Button slot="append" icon="ios-search"></Button>
                </Input>
                <Button @click="modal = true" style="float:right;">添加门锁</Button>
            </Col>
        </Row>
        <Row>
            <Col span="24" style="padding-top:20px;">
                <Table border :columns="columns" :data="dataTable" highlight-row></Table>
                <div style="margin: 10px;overflow: hidden">
                    <div style="float: right;">
                        <Page :total="pageTotal" :current="pageNum" @on-change="changePage" @on-page-size-change="handlePage" :page-size="pageSize" show-total show-elevator show-sizer :page-size-opts="pageSizeOpts"></Page>
                    </div>
                </div>
            </Col>
        </Row>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data () {
        return {
            columns: [  //表格属性
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '设备名称',
                    key: 'lockName',
                    sortable: true
                },
                {
                    title: '设备编号',
                    key: 'lockId',
                    sortable: true
                },
                {
                    title: '设备地址',
                    key: 'lockAddress',
                    sortable: true
                },
                {
                    title: '设备状态',
                    key: 'lockState',
                    sortable: true
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.show(params.index)
                                    }
                                }
                            }, '修改'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.index)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            dataTable: [
                {
                    lockName: '门锁设备1',
                    lockId: 'HGJD4356ND',
                    lockAddress: '北京市海淀区中关村南大街甲56号',
                    lockState: '在线'
                },
                {
                    lockName: '门锁设备2',
                    lockId: 'GHDK1598ML',
                    lockAddress: '北京市昌平区回龙观东大街34号',
                    lockState: '在线'
                },
                {
                    lockName: '门锁设备3',
                    lockId: 'WRTH1306MN',
                    lockAddress: '北京市海淀区双清路30号',
                    lockState: '在线'
                },
                {
                    lockName: '门锁设备4',
                    lockId: 'TYJHG2509BR',
                    lockAddress: '北京市海淀区西土城路25号',
                    lockState: '在线'
                },
                {
                    lockName: '门锁设备5',
                    lockId: 'DCGVB3487HJ',
                    lockAddress: '北京市朝阳区立水桥南路103号',
                    lockState: '在线'
                }
            ],    //表格数据
            pageTotal: 0,   //分页总条数
            pageNum: 1,     //分页页码
            pageSize: 10,     //每页条数
            pageSizeOpts: [5,10,15],  //每页条数设置
        }
    },
    methods: {
        requestPerson () {
            let _that = this;
            let base = ''
            axios.get(`${base}/locks`).then(function(response) {
                console.log(response);
                _that.dataTable = response.data.Locks;
                _that.pageTotal = 100;
            })  
        }
    },
    mounted () {
        this.requestPerson();
    } 
}
</script>
