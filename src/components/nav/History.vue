<template>
    <div>
        <Row>
            <Col span="24" style="padding-top:20px;">
                <Table border :columns="columns" :data="dataTable" highlight-row :loading="loading"></Table>
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
                    title: '员工名称',
                    key: 'username',
                    sortable: true
                },
                {
                    title: '手机号',
                    key: 'tel',
                    sortable: true
                },
                {
                    title: '设备名称',
                    key: 'debicename',
                    sortable: true
                },
                {
                    title: '操作时间',
                    key: 'creatTime',
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
            dataTable: [],    //表格数据
            pageTotal: 0,   //分页总条数
            pageNum: 1,     //分页页码
            pageSize: 10,     //每页条数
            pageSizeOpts: [5,10],  //每页条数设置
            loading: true,    //表格loading
        }
    },
    methods: {
        requestHistory () {
            let _that = this;
            this.$http({
                url: '/dom/log/find',
                method: 'post',
                data: {pageNo:this.pageNum,pageSize:this.pageSize},
                transformRequest: [function (data) {
                    let ret = '';
                    for (let it in data) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
                    }
                    return ret;
                }],
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(function (response) {
                console.log(response);
                if(response.data.result === "成功") {
                    _that.loading = false;
                    _that.dataTable = response.data.msg.list;
                    _that.pageTotal = response.data.msg.totalRecords;
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        changePage (value) {    //分页页码点击事件
            this.pageNum = value;  
            this.loading = true;
            this.requestHistory();
        },
        handlePage (value) {    //分页条数改变事件
            this.pageSize = value;
            this.loading = true;
            this.requestHistory();
        },
    },
    mounted () {
        this.requestHistory();
    } 
}
</script>
