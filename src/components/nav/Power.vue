<template>
    <Tabs value="name1" @on-click="changeTab">
        <TabPane label="根据门禁设备查看" name="name1">
            <div>
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
        </TabPane>
        <TabPane label="根据员工查看" name="name2">
            <div>
                <Row>
                    <Col span="24" style="padding-top:20px;">
                        <Table border :columns="columnss" :data="dataTables" highlight-row></Table>
                        <div style="margin: 10px;overflow: hidden">
                            <div style="float: right;">
                                <Page :total="pageTotal" :current="pageNum" @on-change="changePage" @on-page-size-change="handlePage" :page-size="pageSize" show-total show-elevator show-sizer :page-size-opts="pageSizeOpts"></Page>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </TabPane>
    </Tabs>
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
                        title: '门禁设备名称',
                        key: 'lock',
                        sortable: true
                    },
                    {
                        title: '员工姓名',
                        key: 'person',
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
                columnss: [  //表格属性
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '员工姓名',
                        key: 'person',
                        sortable: true
                    },
                    {
                        title: '门禁设备名称',
                        key: 'lock',
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
                        id: 1,
                        lock: '门禁设备1',
                        person: '张虎，李旺，韩雨桐'
                    },
                    {
                        id: 2,
                        lock: '门禁设备2',
                        person: '宋梦竹，龚芃旭，刘傲天，郑一卓'
                    },
                    {
                        id: 3,
                        lock: '门禁设备3',
                        person: '吴瑞航，赵熙成，刘雨熙，郭东来，杨舒幻'
                    },
                    {
                        id: 4,
                        lock: '门禁设备4',
                        person: '丁文博，王一涵，李清照，李忠艳'
                    },
                    {
                        id: 5,
                        lock: '门禁设备5',
                        person: '赵亮亮，石宇驰，王晓东，马东'
                    },
                    {
                        id: 6,
                        lock: '门禁设备6',
                        person: '张欢欢，王柳，刘新文'
                    },
                    {
                        id: 7,
                        lock: '门禁设备7',
                        person: '卢怜云，丁访天，张三丰，温灵松，关俊喆'
                    },
                    {
                        id: 8,
                        lock: '门禁设备8',
                        person: '张琴轩，高慧云，邢雨兰，姚友易'
                    },
                    {
                        id: 9,
                        lock: '门禁设备9',
                        person: '袁寻芹，王阳云，马涵涵'
                    },
                    {
                        id: 10,
                        lock: '门禁设备10',
                        person: '陆怀梦，冯梓璐，陈怀慕，邸依云，田正平'
                    },
                ],    //表格数据
                dataTables: [
                    {
                        id: 1,
                        person: '田正平',
                        lock: '门禁设备1，门禁设备2，门禁设备3'
                    },
                    {
                        id: 2,
                        person: '马涵涵',
                        lock: '门禁设备3，门禁设备4，门禁设备6，门禁设备7'
                    },
                    {
                        id: 3,
                        person: '张琴轩',
                        lock: '门禁设备5，门禁设备8，门禁设备11，门禁设备13，门禁设备14'
                    },
                    {
                        id: 4,
                        person: '王阳云',
                        lock: '门禁设备6，门禁设备9，门禁设备10，门禁设备12'
                    },
                    {
                        id: 5,
                        person: '王柳',
                        lock: '门禁设备1，门禁设备7，门禁设备9，门禁设备12，门禁设备15，门禁设备16'
                    },
                    {
                        id: 6,
                        person: '尤星泽',
                        lock: '门禁设备10，门禁设备13，门禁设备17，门禁设备18'
                    },
                    {
                        id: 7,
                        person: '边问筠',
                        lock: '门禁设备12，门禁设备19，门禁设备20'
                    },
                    {
                        id: 8,
                        person: '郎书白',
                        lock: '门禁设备21，门禁设备22，门禁设备23，门禁设备24，门禁设备25'
                    },
                    {
                        id: 9,
                        person: '祖立辉',
                        lock: '门禁设备20，门禁设备23，门禁设备26，门禁设备27'
                    },
                    {
                        id: 10,
                        person: '张宇',
                        lock: '门禁设备25，门禁设备28，门禁设备29，门禁设备30，门禁设备31，门禁设备32'
                    }, 
                ],    //表格数据
                pageTotal: 0,   //分页总条数
                pageTotals: 0,   //分页总条数
                pageNum: 1,     //分页页码
                pageSize: 10,     //每页条数
                pageSizeOpts: [5,10,15],  //每页条数设置
            }
        },
        methods: {
            requestPerson () {
                let _that = this;
                let base = ''
                axios.get(`${base}/powerLock`).then(function(response) {
                    console.log(response);
                    _that.dataTable = response.data.powerLock;
                    _that.pageTotal = 100;
                })  
            },
            requestLock () {
                let _that = this;
                let base = ''
                axios.get(`${base}/powerPerson`).then(function(response) {
                    console.log(response);
                    _that.dataTables = response.data.powerPerson;
                    _that.pageTotal = 100;
                })  
            },
            changeTab (value) {
                console.log(value);
                if(value == "name1") {
                    this.requestPerson();
                } else {
                    this.requestLock();
                }
            }
        },
        mounted () {
            this.requestPerson();
            this.requestLock();
        } 
    }
</script>