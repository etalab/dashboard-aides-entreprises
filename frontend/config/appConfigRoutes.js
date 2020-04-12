
export const configAppRoutes = {
  
  help : "this file contains the setup for the routes",

  // ROUTES / PAGES
  routes : [

    { 
      name : "home",
      urls : [ "/"],
      rawHtml : undefined,
      pageRows : [
        { rowNumber: 1,
          columns : [
            
            {
              colName : "Numbers and tables", 
              colClass : "",
              cols : 4,
              md : 5,
              sm : 12,
              lg : null,
              xl : null,
              positionFixed : true,
              colRows : [
                {
                  component : "numbers",
                  activated : true,
                  justify : "center",
                  align : "center",
                  settings : { 
                    id : "numbers-01",
                  },
                },
                {
                  component : "chart",
                  activated : true,
                  justify : "center",
                  align : "center",
                  settings : { 
                    id : "chart-01",
                  },
                },
                {
                  component : "chart",
                  activated : true,
                  justify : "center",
                  align : "center",
                  settings : { 
                    id : "chart-02",
                  },
                },
              ],
            },

            { 
              colName : "main map", 
              colClass : "",
              cols : 8,
              md : 7,
              sm : 12,
              lg : null,
              xl : null,
              positionFixed : false,
              colRows : [
                {
                  component : "map",
                  activated : true,
                  justify : "center",
                  align : "center",
                  settings : {
                    id : "map-france-metro",
                  },
                },
              ],
            },

          ],
        },
        { rowNumber: 2,
          columns : [
            { 
              colName : "text", 
              colClass : "",
              cols : 12,
              md : 12,
              sm : 12,
              lg : null,
              xl : null,
              positionFixed : false,
              colRows : [
                {
                  component : "text",
                  activated : true,
                  justify : "center",
                  align : "center",
                  settings : {
                    id : "text-02",
                  },
                },
              ],
            },
          ],
        },
      ],
    },

    // ONLY MAP
    {
      name : "map",
      urls : ["/map"],
      rawHtml : undefined,
      pageRows : [
        { rowNumber: 1,
          columns : [
            { 
              colName : "map", 
              colClass : "",
              cols : 12,
              md : 12,
              sm : 12,
              lg : null,
              xl : null,
              colRows : [
                {
                  component : "map",
                  activated : true,
                  justify : "center",
                  align : "center",
                  settings : {
                    id : "map-france-metro",
                  },
                },
              ],
            },
          ]
        },
      ],
    },

    // ONLY CHARTS
    {
      name : "charts",
      urls : ["/charts"],
      rawHtml : undefined,
      pageRows : [
        { rowNumber: 1,
          columns : [
            { 
              colName : "chart", 
              colClass : "",
              cols : 12,
              md : 12,
              sm : 12,
              lg : null,
              xl : null,
              colRows : [
                {
                  component : "chart",
                  activated : true,
                  justify : "center",
                  align : "center",
                  settings : { 
                    id : "chart-01",
                  },
                },
              ],
            },
          ]
        },
      ],
    },

    // ONLY TABLE
    {
      name : "table",
      urls : ["/table"],
      rawHtml : undefined,
      pageRows : [
        { rowNumber: 1,
          columns : [
            { 
              colName : "table", 
              colClass : "",
              cols : 12,
              md : 12,
              sm : 12,
              lg : null,
              xl : null,
              colRows : [
                {
                  component : "table",
                  activated : true,
                  justify : "center",
                  align : "center",
                  settings : { 
                    id : "table-01",
                  },
                },
              ],
            },
          ]
        },
      ],
    },

    // ONLY RAW DATA
    {
      name : "rawData",
      urls : ["/rawData"],
      rawHtml : undefined,
      pageRows : [
        { rowNumber: 1,
          columns : [
            { 
              colName : "rawData", 
              colClass : "",
              cols : 12,
              md : 12,
              sm : 12,
              lg : null,
              xl : null,
              colRows : [
                {
                  component : "rawData",
                  activated : true,
                  justify : "center",
                  align : "center",
                  settings : { 
                    id : "chart-01",
                  },
                },
              ],
            },
          ]
        },
      ],
    },

  ]



}