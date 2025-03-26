
package initializers

import (
	"github.com/prometheus/client_golang/prometheus"
)

var RequestCounter *prometheus.CounterVec


func InitPrometheus() {
	
	RequestCounter = prometheus.NewCounterVec(
		prometheus.CounterOpts{
			Name: "app_requests_total",
			Help: "Total number of requests processed by the application",
		},
		[]string{"method", "endpoint"},
	)
	
	prometheus.MustRegister(RequestCounter)
}
