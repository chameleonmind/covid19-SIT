<template>
  <div class="data-table custom-scrollbar">
    <div class="table-wrapper">
      <vuetable ref="vuetable"
                :api-mode="false"
                :fields="$props.tableHeader"
                :per-page="perPage"
                :css="css.table"
                :sort-order="sortOrder"
                :data-manager="dataManager"
                pagination-path="pagination"
                @vuetable:pagination-data="onPaginationData">
        <template v-slot:actions="{ rowData, rowIndex, rowField }">
          <slot name="actions" :data="{ rowData, rowIndex, rowField }"></slot>
        </template>
      </vuetable>
    </div>
    <vuetable-pagination ref="pagination"
                         :css="css.pagination"
                         @vuetable-pagination:change-page="onChangePage">
    </vuetable-pagination>
  </div>
</template>

<script>
import Vuetable from 'vuetable-2'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
import { _ } from '../config/lodashEssentials'

export default {
  name: 'infoTable',
  data () {
    return {
      perPage: 10,
      recordsPerPage: [5, 10, 15, 30],
      sortOrder: [
        {
          sortField: 'date',
          direction: 'desc'
        }
      ],
      css: {
        table: {
          ascendingIcon: 'icon-chevron-up',
          descendingIcon: 'icon-chevron-down'
        },
        pagination: {
          wrapperClass: 'pagination',
          activeClass: 'active',
          disabledClass: 'disabled',
          pageClass: 'page-btn',
          linkClass: 'page-btn',
          paginationClass: 'pagination-class',
          paginationInfoClass: 'pagination-info-class',
          dropdownClass: 'dropdown-class',
          icons: {
            first: 'icon-chevrons-left',
            prev: 'icon-chevron-left',
            next: 'icon-chevron-right',
            last: 'icon-chevrons-right'
          }
        }
      },
      data: []
    }
  },
  components: {
    Vuetable,
    VuetablePagination
  },
  props: {
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    tableHeader: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  mounted () {
    this.data = this.$props.tableData
  },
  methods: {
    refreshTable () {
      this.$refs.vuetable.refresh()
    },
    dataManager (sortOrder, pagination) {
      if (this.$props.tableData.length < 1) return

      let local = this.$props.tableData

      // sortOrder can be empty, so we have to check for that as well
      if (sortOrder.length > 0) {
        local = _.orderBy(
          local,
          sortOrder[0].sortField,
          sortOrder[0].direction
        )
      }

      pagination = this.$refs.vuetable.makePagination(
        local.length,
        this.perPage
      )

      const from = pagination.from - 1
      const to = from + this.perPage

      return {
        pagination: pagination,
        data: _.slice(local, from, to)
      }
    },
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    }
  }
}
</script>
